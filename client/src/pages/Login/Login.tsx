import "./Login.css";
import { Link } from "react-router";

function Login() {
  return (
    <main className="login-page">
      <section className="formlogin-container">
        <h1>Connexion</h1>
        <form className="login-form">
          <div className="label-input">
            <label htmlFor="email">Identifiant</label>
            <input
              type="email"
              id="email"
              name="email"
              // placeholder="Ex: bamba@gmail.com"
            />
          </div>
          <div className="label-input">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              // placeholder="***********"
            />
          </div>

          <Link to="/app/reset-password">mot de passe oublié ?</Link>

          <button type="submit" className="login-button">
            Se connecter
          </button>

          <p>
            Pas encore inscrit ? <Link to="/app/register">Créer un compte</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
