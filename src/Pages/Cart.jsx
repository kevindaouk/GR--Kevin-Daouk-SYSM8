import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Kunde inte hämta varukorgen:", error);
      });
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) {
      // Ta bort helt om kvantiteten blir 0
      axios
        .delete(`http://localhost:3001/orders/${item.id}`)
        .then(fetchOrders)
        .catch((err) => console.error("Kunde inte ta bort produkten:", err));
      return;
    }

    const updatedItem = {
      ...item,
      quantity: newQuantity,
      total: newQuantity * item.price,
    };

    axios
      .put(`http://localhost:3001/orders/${item.id}`, updatedItem)
      .then(fetchOrders)
      .catch((err) => console.error("Kunde inte uppdatera produkt:", err));
  };

  const handleClearCart = () => {
    // Ta bort alla ordrar en i taget
    const deleteRequests = orders.map((item) =>
      axios.delete(`http://localhost:3001/orders/${item.id}`)
    );

    Promise.all(deleteRequests)
      .then(fetchOrders)
      .catch((err) => console.error("Kunde inte rensa varukorgen:", err));
  };

  const totalAmount = orders.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="cart-page">
      <h2>Varukorg</h2>

      <div className="cart-table">
        <div className="cart-header">
          <div className="header-cell">Maträtt</div>
          <div className="header-cell center">Kvantitet</div>
          <div className="header-cell right">Pris</div>
        </div>

        {orders.map((item) => (
          <div key={item.id} className="cart-row">
            <div className="cart-img-col">
              <img src={`/images/${item.image}`} alt={item.name} />
              <p className="cart-name">{item.name}</p>
            </div>
            <div className="cart-qty-col">
              <button onClick={() => handleQuantityChange(item, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item, +1)}>+</button>
            </div>
            <div className="cart-price-col">
              <strong>{item.price} kr</strong>
            </div>
          </div>
        ))}

        <div className="cart-footer">
          <div className="cart-total">Totalt: {totalAmount} kr</div>
          <div className="cart-buttons">
            <button className="clear-button" onClick={handleClearCart}>
              Töm varukorg
            </button>
            <button
              className="checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Betala
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
