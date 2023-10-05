import "./Card.css"
import { ICard } from "../../App"

export default function Card(props: {
  key: string
  card: ICard
  imgWidth: number
  clickHandler: () => void
}) {
  const { name, cardImage } = props.card
  return (
    <div className="single-card" onClick={() => props.clickHandler()}>
      <img
        src={`${cardImage}`}
        alt={name}
        className="undraggable"
        style={{
          width: `${props.imgWidth}rem`,
        }}
      />
    </div>
  )
}
