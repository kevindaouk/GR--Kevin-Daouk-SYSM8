import { useEffect, useState } from "react";

function ProductModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);

  // Återställer kvantitet varje gång produkt ändras
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToOrder = () => {
    alert(`Lade till ${quantity} x ${product.name} i beställningen`);
    onClose(); // återställer kvantitet via useEffect när man lägger till
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          className="modal-image"
        />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>
          <strong>{product.price} kr</strong>
        </p>

        <div className="quantity-controls">
          <button onClick={handleDecrease}>−</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>

        <button className="add-button" onClick={handleAddToOrder}>
          Lägg till i beställningen ({product.price * quantity} kr)
        </button>
      </div>
    </div>
  );
}

export default ProductModal;
