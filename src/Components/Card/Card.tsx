import "./Card.css"
import { ICard } from "../../App"

export default function Card({
  card,
  imgWidth,
  clickHandler,
}: {
  card: ICard
  imgWidth: number
  clickHandler: () => void
}) {
  const { name, cardImage } = card
  return (
    <div className="single-card" onClick={() => clickHandler()}>
      <img
        src={`${cardImage}`}
        alt={name}
        className="undraggable"
        style={{
          width: `${imgWidth}rem`,
        }}
      />
    </div>
  )
}
