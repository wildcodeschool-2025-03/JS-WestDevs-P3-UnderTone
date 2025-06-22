import { Link } from "react-router";
import "./Header.css";
import { useState } from "react";

/*function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav>
        <figure>
          <img src="Logo.png" alt="logo" className="logo-site" />
        </figure>

        <div className="header-icone-container">
          <Link to="/connexion">
            <img
              src="icone-header-connexion.png"
              alt="icone"
              className="icone"
            />{" "}
          </Link>

          <button onClick={toggleMenu} type="button" id="burger-menu">
            ☰
          </button>
          <ul className={`navbar-list ${isMenuOpen ? "show" : "hide"}`}>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/countries" onClick={toggleMenu}>
                Destinations
              </Link>
            </li>
            <li>
              <Link to="/saved" onClick={toggleMenu}>
                Mes favoris
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;*/

function Header() {
  const [showLinks, setShowLinks] = useState(false);

  const handleSowLinks = () => setShowLinks(!showLinks);

  return (
    <>
      <header>
        <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"} `}>
          <div className="navbar_logo">
            <img
              src="images/Logo_UnderTone.svg"
              alt="Logo représentant un casque"
            />
          </div>

          <ul className="navbar_links">
            <li className="navbar_item">
              <Link to="/event">
                EVENEMENT <img src="/images/+.svg" alt="" />
              </Link>
            </li>

            <li>
              <Link to="/search">RECHERCHE</Link>
            </li>

            <li>
              <Link to="/contact">CONTACT</Link>
            </li>
            <li>
              <Link to="/login">
                <img src="images/Generic avatar.svg" alt="Connexion icon" />
              </Link>
            </li>
          </ul>
          <button
            className="navbar_burger"
            type="button"
            onClick={handleSowLinks}
          >
            <span className="burger_bar"> </span>
          </button>
        </nav>
      </header>
    </>
  );
}
export default Header;
