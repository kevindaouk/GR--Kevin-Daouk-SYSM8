import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  // State för lagrade ordrar
  const [orders, setOrders] = useState([]);

  // Betalningsuppgifter
  const [paymentMethod, setPaymentMethod] = useState("Swish");
  const [phone, setPhone] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const navigate = useNavigate();

  // Hämtar ordrar när sidan laddas
  useEffect(() => {
    axios.get("http://localhost:3001/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  const totalAmount = orders.reduce((sum, item) => sum + item.total, 0);

  // Validerar input beroende på betalningsmetod
  const isValidPhone = phone.match(/^\d{10}$/);
  const isValidName = cardName.match(/^[a-zA-ZåäöÅÄÖ\s]+$/);
  const isValidCard = cardNumber.match(/^\d{16}$/);
  const isValidCVC = cvc.match(/^\d{3}$/);
  const isCardValid =
    isValidName && isValidCard && isValidCVC && expiry.length > 0;

  // Slutgiltig validering beroende på metod
  const isFormValid =
    paymentMethod === "Swish"
      ? isValidPhone
      : paymentMethod === "Kort"
      ? isCardValid
      : false;

  // När man klickar "Bekräfta beställning"
  const handleConfirm = () => {
    // Hämtar alla orders igen (för säkerhet)
    axios.get("http://localhost:3001/orders").then((res) => {
      // Skapar DELETE-anrop för varje beställning
      const deleteRequests = res.data.map((item) =>
        axios.delete(`http://localhost:3001/orders/${item.id}`)
      );

      // När alla ordrar raderats
      Promise.all(deleteRequests)
        .then(() => {
          const total = res.data.reduce((sum, item) => sum + item.total, 0);
          const orderNum = Math.floor(10000 + Math.random() * 90000);

          // Skicka med total + ordernummer till confirmationssidan
          navigate("/confirmation", {
            state: { total, orderNum },
          });
        })
        .catch((err) => console.error("Kunde inte rensa beställning:", err));
    });
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

      {paymentMethod === "Swish" && (
        <div className="swish-input">
          <label>Telefonnummer (10 siffror)</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
          />
        </div>
      )}

      {paymentMethod === "Kort" && (
        <div className="card-inputs">
          <label>Namn på kortet</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) =>
              setCardName(e.target.value.replace(/[^a-zA-ZåäöÅÄÖ\s]/g, ""))
            }
          />

          <label>Kortnummer (16 siffror)</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
            maxLength={16}
          />

          <label>CVC (3 siffror)</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
            maxLength={3}
          />

          <label>Giltigt till (MM/ÅÅ)</label>
          <input
            type="month"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
        </div>
      )}

      <button
        className="confirm-button"
        onClick={handleConfirm}
        disabled={!isFormValid}
      >
        Bekräfta beställning
      </button>
    </div>
  );
}

export default Checkout;
