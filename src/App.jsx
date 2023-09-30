import './App.css'
import {useState} from "react";
import Cards from './Components/Cards/Cards';

export default function App() {
    const [knowGame, setKnowGame] = useState(false)
    const [startGame, setStartGame] = useState(false)
    const [rowsForGrid, setRowsForGrid] = useState(2)
    const [columnsForGrid, setColumnsForGrid] = useState(2)

    const playerArray = ["Alaba", "Arrizabalaga", "Bellingham", "Brahim", "Camavinga", "Carvajal", "Ceballos", "Courtois", "Garcia", "Guler", "Joselu", "Kroos", "Lunin", "Mendy", "Militao", "Modric", "Nacho", "Rodrygo", "Rudiger", "Tchouameni", "Valverde", "Vazquez", "Vinicius"]

    const playerToPlayReturner = () => {
      const tempArr = [...playerArray]
      const totalPlayersToSelect = rowsForGrid * columnsForGrid
      const arrToReturn = []
      for (let i = 0; i < totalPlayersToSelect; i++) {
        const randomInt = Math.floor(Math.random() * tempArr.length)
        arrToReturn.push({name: tempArr[randomInt], clicked: false, cardImage: `${tempArr[randomInt]}.png`})
        tempArr.splice(randomInt, 1);
      }
      return arrToReturn
    }

    return (
        <>
            <header>
                <h1>Memory Game</h1>
            </header>
            {(!knowGame) ? (
                <div id='explainer'>

                    <p>Here&apos;s how the game works:</p>
                    <p>You have to click different cards each round to win the game, <br/> if you click a card you have
                        already
                        clicked
                        you lose...</p>
                    <button onClick={() => setKnowGame(true)}>Continue</button>
                </div>
            ) : (!startGame) ? (
                <div id='game-creator'>
                    <p>Create your cards grid:</p>
                    <input type="number" min={2} max={4} value={rowsForGrid}
                           onChange={(e) => setRowsForGrid(Number(e.target.value))}/>
                    <input type="number" min={2} max={4} value={columnsForGrid}
                           onChange={(e) => setColumnsForGrid(Number(e.target.value))}/>
                           <br />
                    <button onClick={() => setStartGame(true)}>Start game</button>
                </div>
            ):
            <Cards playersArrayGenerator={playerToPlayReturner} rows={rowsForGrid} cols={columnsForGrid}/>
            
            }

        </>
    )
}

