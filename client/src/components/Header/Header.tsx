import { Link } from "react-router";
import "./Header.css";
import { useState } from "react";

function Header() {
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => setShowLinks(!showLinks);

  return (
    <header>
      <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"} `}>
        <Link to="/app">
          <img
            className="logo"
            src="/images/Logo_UnderTone.svg"
            alt="Logo représentant un casque"
          />
        </Link>
        <div className="nav-wrapper">
          <ul>
            <li>
              <Link to="/app" onClick={handleShowLinks}>
                EVENEMENT
                <span />
              </Link>
            </li>

            <li>
              <Link to="/app" onClick={handleShowLinks}>
                RECHERCHE
              </Link>
            </li>

            <li>
              <Link to="/app" onClick={handleShowLinks}>
                CONTACT
              </Link>
            </li>
          </ul>
          <Link to=" ">
            <img src="/images/Generic avatar.svg" alt="Connexion icon" />
          </Link>
          <button
            className="navbar_burger"
            type="button"
            onClick={handleShowLinks}
          >
            <span className="burger_bar" />
          </button>
        </div>
      </nav>
    </header>
  );
}
export default Header;
