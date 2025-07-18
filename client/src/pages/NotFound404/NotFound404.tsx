import { Link } from "react-router";
import "./NotFound404.css";

function NotFound() {
  return (
    <main className="not-found">
      <img
        src="/images/Page_404.png"
        alt="404 - Page non trouvée"
        className="not-found-image"
      />
      <section>
        <h1>404</h1>
        <p>Oups ! Cette page n'existe pas.</p>
        <Link to="/app/home" className="home-link">
          Retour à l'accueil
        </Link>
      </section>
    </main>
  );
}
export default NotFound;
