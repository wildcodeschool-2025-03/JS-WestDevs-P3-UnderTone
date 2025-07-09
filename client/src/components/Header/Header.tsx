import { useState } from "react";
import { Link } from "react-router";
import "./Header.css";
import UserMenu from "./UserMenu/UserMenu";

function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const handleShowLinks = () => setShowLinks(!showLinks);

  const handleAvatarToggle = () => {
    setShowPopover((prev) => !prev);
  };

  return (
    <header>
      <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
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
              <Link to="research" onClick={handleShowLinks}>
                RECHERCHE
              </Link>
            </li>

            <li>
              <Link to="/app" onClick={handleShowLinks}>
                CONTACT
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={handleAvatarToggle}
            className="avatar-button"
          >
            <img src="/images/Generic avatar.svg" alt="Connexion icon" />
          </button>
          <UserMenu showPopover={showPopover} setShowPopover={setShowPopover} />

          <button
            type="button"
            className="navbar_burger"
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
