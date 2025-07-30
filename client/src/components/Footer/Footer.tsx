import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <section>
        <a href="https://twiter.com" target="_blank" rel="noreferrer">
          <img src="/images/logo_x.svg" alt="logo x" />
        </a>
        <ul>
          <li>
            <Link to="/CGU">
              <p>Conditions Générales d’utilisation</p>
            </Link>
          </li>

          <li>
            <p>Équipe de développement</p>
          </li>
          <li>
            <p>© Copyright UnderTone 2025</p>
          </li>
        </ul>
      </section>
    </footer>
  );
}
export default Footer;
