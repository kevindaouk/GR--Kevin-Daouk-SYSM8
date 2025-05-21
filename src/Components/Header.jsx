import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Hem</Link> | <Link to="/menu">Meny</Link> |{" "}
        <Link to="/cart">Varukorg</Link>
      </nav>
    </header>
  );
}

export default Header;
