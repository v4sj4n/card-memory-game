import "./Card.css"
export default function Card(props) {
  const {name, cardImage} = props.player
  return (
    <div className="single-card" onClick={() => props.clickHandler()}>
      <img
        src={`/${cardImage}`}
        alt={name}
        style={{
          width: `${props.imgWidth}rem`,
        }}
      />
    </div>
  );
}
