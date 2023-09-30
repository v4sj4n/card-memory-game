import { useState } from "react";
import Card from "../Card/Card";
import "./Cards.css"

export default function Cards(props) {
  const { playersArrayGenerator, cols, rows } = props;

  const [gamePlayerArray, setGamePlayerArray] = useState(playersArrayGenerator);
  let imgWidth;
  if(rows === 2){
    imgWidth = 12
  } else if(rows === 3){
    imgWidth = 8
  } else {
    imgWidth = 6;
  }

  const cardClickHandler = (player) => {
    setGamePlayerArray((prevGamePlayerArray) => {
      return prevGamePlayerArray.map((pl) => 
      pl.name === player.name ? {...pl, clicked: true} : pl)
    } )
    console.log(gamePlayerArray)
  } 
  return (
    <div>
      <p>You created a {rows} x {cols} grid, good luck!</p>
      <div
      id="cards-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,

      }}
    >
      {gamePlayerArray.map((player) => (
        <Card key={player.name} player={player} imgWidth={imgWidth} clickHandler={() => cardClickHandler(player)}/>
      ))}
      </div>
    </div>
  );
}
