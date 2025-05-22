import { useEffect, useState } from "react";
import axios from "axios";
import ProductModal from "../Components/ProductModal";

function Menu() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("Alla");
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const filteredProducts =
    filter === "Alla"
      ? products
      : products.filter((product) => product.category === filter);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  return (
    <div className="menu-page">
      <h2>Meny</h2>

      <div className="filter-buttons">
        {["Alla", "Förrätt", "Huvudrätt", "Efterrätt"].map((category) => (
          <button
            key={category}
            className={`filter-button ${filter === category ? "active" : ""}`}
            onClick={() => handleFilterChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="menu-item"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={`/images/${product.image}`}
              alt={product.name}
              className="menu-image"
            />
            <h3>{product.name}</h3>
            <p className="menu-description">{product.description}</p>
            <p>{product.price} kr</p>
          </div>
        ))}
      </div>

      {/* Modal visas om något är valt */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default Menu;
