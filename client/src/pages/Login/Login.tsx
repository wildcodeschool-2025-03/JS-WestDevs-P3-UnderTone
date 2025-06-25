import "./Login.css";
import { Link } from "react-router";

function Login() {
  return (
    <main className="login-page">
      <section>
        <h1>Connexion</h1>
        <form>
          <div>
            <input
              type="email"
              required
              autoComplete="on"
              id="email"
              name="email"
            />
            <label htmlFor="email">Identifiant</label>
          </div>
          <div>
            <input
              type="password"
              required
              autoComplete="on"
              id="password"
              name="password"
            />
            <label htmlFor="password">Mot de passe</label>
          </div>

          <Link to="/app/reset-password">mot de passe oublié ?</Link>

          <button type="submit">Se connecter</button>

          <p>
            Pas encore inscrit ? <Link to="/app/register">Créer un compte</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
