import './Card.css'
import { ICard } from '../../App'

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
    <div class='single-card' onClick={() => clickHandler()}>
      <img
        src={`${cardImage}`}
        alt={name}
        class='undraggable'
        style={{
          width: `${imgWidth}rem`,
        }}
      />
    </div>
  )
}
