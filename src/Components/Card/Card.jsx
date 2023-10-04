import "./Card.css"
export default function Card(props) {
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
