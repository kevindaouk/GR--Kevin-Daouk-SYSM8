import { Link } from "react-router-dom";
import logo from "../images/logga.png";

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
        <img src={logo} alt="Drone Delights logo" className="logo-center" />
      </div>
    </header>
  );
}

export default Header;
