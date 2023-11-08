import { createSignal, createEffect } from 'solid-js'
import { ICard } from '../App'

const useCardsFetcher = (size: number) => {
  const [arrayToReturn, setArrayToReturn] = createSignal<ICard[]>([])
  const [error, setError] = createSignal<Error | null>(null)
  const [loading, setLoading] = createSignal<boolean>(true)

  createEffect(() => {
    const fetchData = async () => {
      const tempArr: ICard[] = []
      let randomi = Math.floor(Math.random() * 752) + 1
      for (let i = randomi; i < randomi + size; i++) {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then((result) => result.json())
          .then((data) => {
            console.log(data)
            tempArr.push({
              name: data.species.name,
              cardImage: !data.sprites.front_default
                ? data.sprites.other['official-artwork'].front_default
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
    console.log(error())
    console.log(loading())
  }, [])

  return { arrayToReturn, error, loading }
}

export default useCardsFetcher
