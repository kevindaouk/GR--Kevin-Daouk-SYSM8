// Importerar React Router-komponenter och sidor
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Confirmation from "./Pages/Confirmation";
import "./App.css";

function App() {
  return (
    // Innesluter hela appen i en Router så att sidnavigering fungerar
    <Router>
      {/* Header visas på alla sidor */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
