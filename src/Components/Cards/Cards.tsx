import "./Cards.css"
import { useState, useEffect } from "react"
import Card from "../Card/Card"
import { ICard } from "../../App"
import useCardsFetcher from "../../utils/useCardsFetcher"

export default function Cards({
  rows,
  cols,
  newGame,
}: {
  rows: number
  cols: number
  newGame: () => void
}) {
  const [gameCardsArray, setGameCardsArray] = useState<ICard[]>([])
  const [round, setRound] = useState<number>(1)
  const [won, setWon] = useState<boolean>(false)
  const [lost, setLost] = useState<boolean>(false)
  const [twiceClickedCard, setTwiceClickedCard] = useState<string>("")
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
    const newArray = gameCardsArray.map((crd) =>
      crd.name === card.name ? { ...crd, clicked: true } : crd
    )

    setGameCardsArray(arrayShuffler(newArray))
    setRound((prevRound) => prevRound + 1)
  }

  useEffect(() => {
    if (!loading && !error) {
      setGameCardsArray(arrayToReturn)
    }
  }, [loading])

  useEffect(() => {
    if (
      gameCardsArray.length > 0 &&
      gameCardsArray.every((card) => card.clicked)
    ) {
      setWon(true)
    }
  }, [gameCardsArray])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Encountered an error</p>

  return (
    <div>
      {!won && !lost ? (
        <>
          {round === 1 ? (
            <p>
              You created a {rows} x {cols} grid, good luck! Round {round} /{" "}
              {rows * cols}{" "}
            </p>
          ) : (
            <p>
              Round {round} / {rows * cols}{" "}
            </p>
          )}
          <div
            id="cards-grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
          >
            {gameCardsArray.map((card) => (
              <Card
                key={card.name}
                card={card}
                imgWidth={imgWidth}
                clickHandler={() => cardClickHandler(card)}
              />
            ))}
          </div>
        </>
      ) : lost ? (
        <>
          <p>
            You lost in round {round - 1} ,{" "}
            {twiceClickedCard[0].toUpperCase() + twiceClickedCard.slice(1)} was
            clicked once
          </p>
          <button
            onClick={() => {
              setWon(false)
              newGame()
              setGameCardsArray([])
              setRound(1)
            }}
            className="another-game"
          >
            Play another game
          </button>
        </>
      ) : (
        <>
          <p>You won</p>
          <button
            onClick={() => {
              setWon(false)
              setGameCardsArray([])
              newGame()
              setRound(1)
            }}
            className="another-game"
          >
            Play another game
          </button>
        </>
      )}
    </div>
  )
}
