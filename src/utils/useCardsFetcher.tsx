import { createSignal, createEffect } from 'solid-js'
import { ICard } from '../App'

const useCardsFetcher = (size: number) => {
  const [arrayToReturn, setArrayToReturn] = createSignal<ICard[]>([])
  const [error, setError] = createSignal<any>(null)
  const [loading, setLoading] = createSignal<boolean>(true)

  createEffect(() => {
    const fetchPokemon = async (id: Number) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const data = await response.json()
      return {
        name: data.species.name,
        cardImage: !data.sprites.front_default
          ? data.sprites.other['official-artwork'].front_default
          : data.sprites.front_default,
        clicked: false,
      }
    }
    const fetchData = async () => {
      const promisesArray: ICard[] = []
      let randomi = Math.floor(Math.random() * 752) + 1
      for (let i = randomi; i < randomi + size; i++) {
        promisesArray.push(await fetchPokemon(i))
      }

      try {
        const data = await Promise.all(promisesArray)
        setArrayToReturn(data)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchData()
  })

  return { arrayToReturn, error, loading }
}

export default useCardsFetcher
