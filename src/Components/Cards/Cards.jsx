import "./Cards.css"
import { useState, useEffect } from "react";
import Card from "../Card/Card";

export default function Cards(props) {
  const { playersArrayGenerator, cols, rows } = props;

  const [gamePlayerArray, setGamePlayerArray] = useState(playersArrayGenerator);
  const [round, setRound] = useState(1)
  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false);


  let imgWidth;
  if(rows === 2){
    imgWidth = 12
  } else if(rows === 3){
    imgWidth = 8
  } else {
    imgWidth = 6;
  }

  const arrayShuffler = (array) =>{
    let shuffledArray = []
    let usedIndexes = []

    let i = 0
    while (i < array.length) {
      const RandNum = Math.floor(Math.random() * array.length)
      if(!usedIndexes.includes(RandNum)){
        shuffledArray.push(array[RandNum])
        usedIndexes.push(RandNum)
        i++
      }
    }
    return shuffledArray
  }

  const cardClickHandler = (player) => {
    if(player.clicked){
      setLost(true)
    }
    const newArray = gamePlayerArray.map((pl) => 
      pl.name === player.name ? {...pl, clicked: true} : pl)
    
    setGamePlayerArray(arrayShuffler(newArray))
    setRound((prevRound) => prevRound+1)
  } 

  useEffect(() => {
    if (gamePlayerArray.every((player) => player.clicked)) {
      setWon(true);
    }
  }, [gamePlayerArray]);

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
            {gamePlayerArray.map((player) => (
              <Card
                key={player.name}
                player={player}
                imgWidth={imgWidth}
                clickHandler={() => cardClickHandler(player)}
              />
            ))}
          </div>
        </>
      ) : lost ? (
        <>
          <p>You lost</p>
          <button
            onClick={() => {
              setWon(false);
              props.newGame();
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
              setWon(false);
              props.newGame();
            }}
            className="another-game"
          >
            Play another game
          </button>
        </>
      )}
    </div>
  );
}
