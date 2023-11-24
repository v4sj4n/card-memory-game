import { useEffect, useState } from 'react'
import { ICard } from '../App'

const useCardsFetcher = (size: number) => {
  const [arrayToReturn, setArrayToReturn] = useState<ICard[]>([])
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPokemon = async (id: Number) => {
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const data = await result.json()

      return {
        name: data.species.name,
        cardImage: !data.sprites.front_default
          ? data.sprites.other['official-artwork'].front_default
          : data.sprites.front_default,
        clicked: false,
      }
    }
    const fetchData = async () => {
      const fetchPromises: ICard[] = []
      let randomi = Math.floor(Math.random() * 752) + 1
      for (let i = randomi; i < randomi + size; i++) {
        fetchPromises.push(await fetchPokemon(i))
      }

      try {
        const data = await Promise.all(fetchPromises)
        setArrayToReturn(data)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { arrayToReturn, error, loading }
}

export default useCardsFetcher
