import { useState } from "react";
import "./Header.css";
import { Link } from "react-router";

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
  const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar_logo">
            <img src="./images" alt="Logo représentant un casque" />
          </div>

          <ul>
            <li>
              <a href=" ">
                EVENEMENT <img src="client/src/assets/images/+.svg" alt="" />
              </a>
            </li>

            <li>
              <a href=" ">RECHERCHE</a>
            </li>

            <li>
              <a href=" ">CONTACT</a>
            </li>
            <li>
              <a href=" ">
                <img src="images/Generic avatar.svg" alt="Connexion icon" />
              </a>
            </li>
          </ul>
          <button type="button">
            <span> </span>
          </button>
        </nav>
      </header>
    </>
  );
}
export default Header;
