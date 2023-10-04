import "./App.css"
import { useState } from "react"
import Cards from "./Components/Cards/Cards"
import { useEffect } from "react"

export default function App() {
  const [knowGame, setKnowGame] = useState(false)
  const [startGame, setStartGame] = useState(false)
  const [rowsForGrid, setRowsForGrid] = useState(2)
  const [columnsForGrid, setColumnsForGrid] = useState(2)
  const [cardsToPlay, setCardsToPlay] = useState([])

  const cardsFetcher = async () => {
    const arrayToReturn = []
    let randomi = Math.floor(Math.random() * 761) + 1
    for (let i = randomi; i < randomi + (rowsForGrid * columnsForGrid); i++) {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
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
            min={2}
            max={4}
            value={rowsForGrid}
            onChange={(e) => setRowsForGrid(Number(e.target.value))}
          />
          <input
            type="number"
            min={2}
            max={4}
            value={columnsForGrid}
            onChange={(e) => setColumnsForGrid(Number(e.target.value))}
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
          playersArrayGenerator={cardsToPlay}
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
