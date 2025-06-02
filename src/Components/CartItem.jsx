function CartItem({ item, onQuantityChange }) {
  return (
    <div className="cart-row">
      {/* Visar bild och namn på maträtten */}
      <div className="cart-img-col">
        <img src={`/images/${item.image}`} alt={item.name} />
        <p className="cart-name">{item.name}</p>
      </div>

      {/* Visar och hanterar kvantitet med + och - knappar */}
      <div className="cart-qty-col">
        <button onClick={() => onQuantityChange(item, -1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item, +1)}>+</button>
      </div>

      {/* Visar priset för en enhet av produkten */}
      <div className="cart-price-col">
        <strong>{item.price} kr</strong>
      </div>
    </div>
  );
}

export default CartItem;
