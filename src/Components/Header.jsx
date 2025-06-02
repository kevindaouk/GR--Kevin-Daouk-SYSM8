// Importerar Link-komponenten från React Router för att navigera mellan sidor utan omladdning
import { Link } from "react-router-dom";

// Header-komponenten visas överst på alla sidor och innehåller navigeringsmeny + logga
function Header() {
  return (
    <header className="main-header">
      <div className="nav-wrapper">
        <nav className="nav-left">
          <ul className="nav-links">
            <li>
              <Link to="/">Hem</Link>
            </li>
            <li>
              <Link to="/menu">Meny</Link>
            </li>
            <li>
              <Link to="/cart">Varukorg</Link>
            </li>
          </ul>
        </nav>
        <img src="/images/logga.png" alt="Logo" className="logo-center" />
      </div>
    </header>
  );
}

export default Header;
