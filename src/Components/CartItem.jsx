function CartItem({ item, onQuantityChange }) {
  return (
    <div className="cart-row">
      <div className="cart-img-col">
        <img src={`/images/${item.image}`} alt={item.name} />
        <p className="cart-name">{item.name}</p>
      </div>
      <div className="cart-qty-col">
        <button onClick={() => onQuantityChange(item, -1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item, +1)}>+</button>
      </div>
      <div className="cart-price-col">
        <strong>{item.price} kr</strong>
      </div>
    </div>
  );
}

export default CartItem;
