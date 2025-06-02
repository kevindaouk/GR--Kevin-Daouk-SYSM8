// Importerar React hooks och axios för API-anrop
import { useEffect, useState } from "react";
import axios from "axios";

// Visar en popup/modal med info om en vald maträtt
function ProductModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  // När man öppnar en ny maträtt, nollställs kvantitet till 1
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  // Sänker kvantitet (inte lägre än 1)
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Ökar kvantitet
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Lägger till maträtten i beställning (POST till json-server)
  const handleAddToOrder = async () => {
    const orderItem = {
      productId: product.id,
      name: product.name,
      quantity: quantity,
      price: product.price,
      total: product.price * quantity,
      image: product.image,
    };

    try {
      await axios.post("http://localhost:3001/orders", orderItem);
      setSuccessMessage("✔ Tillagd i beställningen!");
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Kunde inte lägga till i beställning:", error);
    }
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

        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default ProductModal;
