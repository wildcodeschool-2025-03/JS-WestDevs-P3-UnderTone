import "../../assets/styles/forms.css";
import "./Login.css";
import { Link } from "react-router";

function Login() {
  return (
    <main className="login-page">
      <section>
        <h1>Connexion</h1>
        <form>
          <div className="input-group">
            <input
              type="email"
              required
              autoComplete="on"
              id="email"
              name="email"
              placeholder=""
            />
            <label htmlFor="email">Email</label>
            <p>Email non valide.</p>
          </div>
          <div className="input-group">
            <input
              type="password"
              required
              autoComplete="on"
              id="password"
              name="password"
              placeholder=""
              pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
            />
            <label htmlFor="password">Mot de passe</label>
            <p>
              Le mot de passe doit contenir entre 8 et 16 caractères, inclure
              des majuscules, des minuscules, des chiffres et des caractères
              spéciaux, sans espaces.
            </p>
          </div>

          <Link to="/app/reset-password">Mot de passe oublié ?</Link>

          <button type="submit">Se connecter</button>
        </form>

        <p>
          Pas encore inscrit ? <Link to="/app/signin">Créer un compte</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
