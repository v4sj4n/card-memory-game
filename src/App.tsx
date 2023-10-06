import "./App.css"
import { useState } from "react"
import Cards from "./Components/Cards/Cards"

export interface ICard {
  name: string
  cardImage: string
  clicked: boolean
}

export default function App() {
  const [knowGame, setKnowGame] = useState<boolean>(false)
  const [startGame, setStartGame] = useState<boolean>(false)
  const [rowsForGrid, setRowsForGrid] = useState<number>(2)
  const [columnsForGrid, setColumnsForGrid] = useState<number>(2)
  const [cardsToPlay, setCardsToPlay] = useState<ICard[]>([])

  const cardsFetcher = async () => {
    const arrayToReturn: ICard[] = []
    let randomi = Math.floor(Math.random() * 752) + 1
    for (let i = randomi; i < randomi + rowsForGrid * columnsForGrid; i++) {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((result) => result.json())
        .then((data) => {
          arrayToReturn.push({
            name: data.species.name,
            cardImage: !data.sprites.front_default
              ? data.sprites.other["official-artwork"].front_default
              : data.sprites.front_default,
            clicked: false,
          })
        })
    }
    setCardsToPlay(arrayToReturn)
  }

  const colRowHandler = (numstr: string) => {
    let num = parseInt(numstr, 10)

    if (isNaN(num) || num < 2) {
      num = 2
    } else if (num > 5) {
      num = 5
    }

    return num
  }

  return (
    <>
      <header>
        <h1>Memory Game</h1>
      </header>
      {!knowGame ? (
        <div id="explainer">
          <p>Here&apos;s how the game works:</p>
          <p>
            You have to click different cards each round to win the game, <br />{" "}
            if you click a card you have already clicked you lose...
          </p>
          <button onClick={() => setKnowGame(true)}>Continue</button>
        </div>
      ) : !startGame ? (
        <div id="game-creator">
          <p>Create your cards grid:</p>
          <input
            type="number"
            value={rowsForGrid}
            onChange={(e) => setRowsForGrid(colRowHandler(e.target.value))}
          />
          <input
            type="number"
            value={columnsForGrid}
            onChange={(e) => setColumnsForGrid(colRowHandler(e.target.value))}
          />
          <br />
          <button
            onClick={() => {
              setStartGame(true)
              cardsFetcher()
            }}
          >
            Start game
          </button>
        </div>
      ) : cardsToPlay.length > 0 ? (
        <Cards
          cards={cardsToPlay}
          rows={rowsForGrid}
          cols={columnsForGrid}
          newGame={() => setStartGame(false)}
          cardArrayCleaner={() => setCardsToPlay([])}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
