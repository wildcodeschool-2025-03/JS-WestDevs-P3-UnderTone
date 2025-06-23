import "./Header.css";
import { useState } from "react";

function Header() {
  const [showLinks, setShowLinks] = useState(false);

  const handleSowLinks = () => setShowLinks(!showLinks);

  return (
    <header>
      <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"} `}>
        <img
          className="logo"
          src="images/Logo_UnderTone.svg"
          alt="Logo représentant un casque"
        />

        <ul>
          <li>
            <a href=" ">
              EVENEMENT <img src="/images/+.svg" alt="" />
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
        <button
          className="navbar_burger"
          type="button"
          onClick={handleSowLinks}
        >
          <span className="burger_bar" />n
        </button>
      </nav>
    </header>
  );
}
export default Header;
