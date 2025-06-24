import { Link } from "react-router";

function Login() {
  return (
    <main className="login-page">
      <section>
        <h1>Connexion</h1>
        <form>
          <label htmlFor="email">Identifiant</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ex: bamba@gmail.com"
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="***********"
          />

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
