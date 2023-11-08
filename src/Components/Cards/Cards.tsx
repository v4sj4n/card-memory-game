import './Cards.css'
import Card from '../Card/Card'
import { ICard } from '../../App'
import { createSignal, createEffect, Show, For } from 'solid-js'

import useCardsFetcher from '../../utils/useCardsFetcher'

export default function Cards({
  rows,
  cols,
  newGame,
}: {
  rows: number
  cols: number
  newGame: () => void
}) {
  const [gameCardsArray, setGameCardsArray] = createSignal<ICard[]>([])
  const [round, setRound] = createSignal<number>(1)
  const [won, setWon] = createSignal<boolean>(false)
  const [lost, setLost] = createSignal<boolean>(false)
  const [twiceClickedCard, setTwiceClickedCard] = createSignal<string>('')
  const { arrayToReturn, error, loading } = useCardsFetcher(rows * cols)

  let imgWidth: number
  if (rows === 2) {
    imgWidth = 12
  } else if (rows === 3) {
    imgWidth = 8
  } else {
    imgWidth = 6
  }

  const arrayShuffler = (array: ICard[]) => {
    let shuffledArray: ICard[] = []
    let usedIndexes: number[] = []

    let i = 0
    while (i < array.length) {
      const RandNum = Math.floor(Math.random() * array.length)
      if (!usedIndexes.includes(RandNum)) {
        shuffledArray.push(array[RandNum])
        usedIndexes.push(RandNum)
        i++
      }
    }
    return shuffledArray
  }

  const cardClickHandler = (card: ICard) => {
    if (card.clicked) {
      setLost(true)
      setTwiceClickedCard(card.name)
    }
    const newArray = gameCardsArray().map((crd) =>
      crd.name === card.name ? { ...crd, clicked: true } : crd
    )
    setGameCardsArray(arrayShuffler(newArray))
    setRound((prevRound) => prevRound + 1)
  }

  createEffect(() => {
    if (!loading() && !error()) {
      setGameCardsArray(arrayToReturn())
    }
  }, [loading(), error()])

  createEffect(() => {
    if (
      gameCardsArray().length > 0 &&
      gameCardsArray().every((card) => card.clicked)
    ) {
      setWon(true)
    }
  })

  return (
    <>
      <Show when={loading() && !error()}>
        <p>Loading...</p>
      </Show>
      <Show when={error()}>error...</Show>
      <Show when={lost()}>
        <>
          <p>
            You lost in round {round() - 1} , {twiceClickedCard()} was clicked
            once
          </p>
          <button
            onClick={() => {
              setWon(false)
              newGame()
              setGameCardsArray([])
              setRound(1)
            }}
            class='another-game'
          >
            Play another game
          </button>
        </>
      </Show>
      <Show when={won()}>
        <>
          <p>You won</p>
          <button
            onClick={() => {
              setWon(false)
              setGameCardsArray([])
              newGame()
              setRound(1)
            }}
            class='another-game'
          >
            Play another game
          </button>
        </>
      </Show>

      <Show when={!won() && !lost()}>
        {round() === 1 ? (
          <p>
            You created a {rows} x {cols} grid, good luck! Round {round()} /{' '}
            {rows * cols}{' '}
          </p>
        ) : (
          <p>
            Round {round()} / {rows * cols}{' '}
          </p>
        )}
        <div
          id='cards-grid'
          style={{
            'grid-template-columns': `repeat(${cols}, 1fr)`,
            'grid-template-rows': `repeat(${rows}, 1fr)`,
          }}
        >
          <For each={gameCardsArray()}>
            {(card) => (
              <Card
                card={card}
                imgWidth={imgWidth}
                clickHandler={() => cardClickHandler(card)}
              />
            )}
          </For>
        </div>
      </Show>
    </>
  )
}
