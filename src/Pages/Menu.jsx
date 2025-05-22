import { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av meny:", error);
      });
  }, []);

  return (
    <div className="menu-page">
      <h2>Meny</h2>
      <div className="menu-list">
        {products.map((product) => (
          <div key={product.id} className="menu-item">
            <img
              src={`/images/${product.image}`}
              alt={product.name}
              className="menu-image"
            />
            <h3>{product.name}</h3>
            <p>{product.price} kr</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
