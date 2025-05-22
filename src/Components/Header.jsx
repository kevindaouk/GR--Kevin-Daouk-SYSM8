import { Link } from "react-router-dom";

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
