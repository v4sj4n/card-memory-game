import { useEffect, useState } from "react"
import { ICard } from "../App"

const useCardsFetcher = (size: number) => {
  const [arrayToReturn, setArrayToReturn] = useState<ICard[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const tempArr: ICard[] = []
      let randomi = Math.floor(Math.random() * 752) + 1
      for (let i = randomi; i < randomi + size; i++) {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then((result) => result.json())
          .then((data) => {
            tempArr.push({
              name: data.species.name,
              cardImage: !data.sprites.front_default
                ? data.sprites.other["official-artwork"].front_default
                : data.sprites.front_default,
              clicked: false,
            })
          })
          .catch((error) => {
            setError(error)
            setLoading(false)
          })
      }
      setArrayToReturn(tempArr)
      setLoading(false)
    }

    fetchData()
  }, [])

  return { arrayToReturn, error, loading }
}

export default useCardsFetcher
