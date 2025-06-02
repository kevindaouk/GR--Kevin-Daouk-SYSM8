import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CartItem from "../Components/CartItem";

function Cart() {
  // State för att spara alla beställningar (orders)
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Körs vid sidladdning – hämtar order-data från backend
  useEffect(() => {
    fetchOrders();
  }, []);

  // Hämtar alla beställningar från json-server
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

  // Ökar eller minskar kvantitet – eller tar bort om 0
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

    // Uppdaterar kvantitet och totalpris
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

  // Tar bort alla beställningar från varukorgen
  const handleClearCart = () => {
    // Ta bort alla ordrar en i taget
    const deleteRequests = orders.map((item) =>
      axios.delete(`http://localhost:3001/orders/${item.id}`)
    );

    Promise.all(deleteRequests)
      .then(fetchOrders)
      .catch((err) => console.error("Kunde inte rensa varukorgen:", err));
  };

  // Räknar ihop totalbeloppet
  const totalAmount = orders.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="cart-page">
      <h2>Varukorg</h2>
      {errorMessage && <p className="cart-error">{errorMessage}</p>}

      <div className="cart-table">
        <div className="cart-header">
          <div className="header-cell">Maträtt</div>
          <div className="header-cell center">Kvantitet</div>
          <div className="header-cell right">Pris</div>
        </div>

        {orders.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
          />
        ))}

        <div className="cart-footer">
          <div className="cart-total">Totalt: {totalAmount} kr</div>
          <div className="cart-buttons">
            <button className="clear-button" onClick={handleClearCart}>
              Töm varukorg
            </button>
            <button
              className="checkout-button"
              onClick={() => {
                if (orders.length === 0) {
                  setErrorMessage(
                    "Varukorgen är tom. Du måste lägga till något först."
                  );
                } else {
                  navigate("/checkout");
                }
              }}
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
