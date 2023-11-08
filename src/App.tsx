import './App.css'
import { createSignal } from 'solid-js'

import Cards from './Components/Cards/Cards'

export interface ICard {
  name: string
  cardImage: string
  clicked: boolean
}

export default function App() {
  const [knowGame, setKnowGame] = createSignal<boolean>(false)
  const [startGame, setStartGame] = createSignal<boolean>(false)
  const [rowsForGrid, setRowsForGrid] = createSignal<number>(2)
  const [columnsForGrid, setColumnsForGrid] = createSignal<number>(2)

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
        <h1>
          <a href='/'>Memory Game</a>
        </h1>
      </header>
      {!knowGame() ? (
        <div id='explainer'>
          <p>Here&apos;s how the game works:</p>
          <p>
            You have to click different cards each round to win the game, <br />{' '}
            if you click a card you have already clicked you lose...
          </p>
          <button onClick={() => setKnowGame(true)}>Continue</button>
        </div>
      ) : !startGame() ? (
        <div id='game-creator'>
          <p>Create your cards grid:</p>
          <input
            type='number'
            value={rowsForGrid()}
            onChange={(e) => setRowsForGrid(colRowHandler(e.target.value))}
          />
          <input
            type='number'
            value={columnsForGrid()}
            onChange={(e) => setColumnsForGrid(colRowHandler(e.target.value))}
          />
          <br />
          <button
            onClick={() => {
              setStartGame(true)
            }}
          >
            Start game
          </button>
        </div>
      ) : (
        <Cards
          rows={rowsForGrid()}
          cols={columnsForGrid()}
          newGame={() => setStartGame(false)}
        />
      )}
    </>
  )
}
