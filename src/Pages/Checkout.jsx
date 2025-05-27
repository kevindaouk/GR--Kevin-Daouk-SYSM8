import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [orders, setOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Swish");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  const totalAmount = orders.reduce((sum, item) => sum + item.total, 0);

  const handleConfirm = () => {
    // Här kan du lägga till POST till bekräftelser senare
    navigate("/confirmation");
  };

  return (
    <div className="checkout-page">
      <h2>Betalning</h2>
      <p>
        Totalt att betala: <strong>{totalAmount} kr</strong>
      </p>

      <div className="payment-method">
        <label>
          <input
            type="radio"
            value="Swish"
            checked={paymentMethod === "Swish"}
            onChange={() => setPaymentMethod("Swish")}
          />
          Swish
        </label>
        <label>
          <input
            type="radio"
            value="Kort"
            checked={paymentMethod === "Kort"}
            onChange={() => setPaymentMethod("Kort")}
          />
          Kort
        </label>
      </div>

      <button className="confirm-button" onClick={handleConfirm}>
        Bekräfta beställning
      </button>
    </div>
  );
}

export default Checkout;
