import { useLocation } from "react-router-dom";

function Confirmation() {
  // Hämtar skickad data (totalbelopp + ordernummer)
  const location = useLocation();
  const { total, orderNum } = location.state || {};

  return (
    <div className="confirmation-page">
      <h2>Bekräftelse</h2>
      <h1>Tack så mycket för din beställning!</h1>

      <div className="confirmation-details">
        <p>
          <strong>Ordernummer:</strong> {orderNum}
        </p>
        <p>
          <strong>Total kostnad:</strong> {total} kr
        </p>
        <p>
          <strong>Beräknad väntetid:</strong> 20–30 min
        </p>
      </div>
    </div>
  );
}

export default Confirmation;
