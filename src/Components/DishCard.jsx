function DishCard({ name, description, price, image, onAdd }) {
  return (
    <div className="dish-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{price} kr</p>
      <button onClick={onAdd}>Lägg till</button>
    </div>
  );
}

export default DishCard;
