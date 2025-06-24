import { Link } from "react-router";
import "./SignInForm.css";

function SignInForm() {
  return (
    <main className="signin-page">
      <section className="form-container">
        <h1>Inscription</h1>

        <div className="custom-radio-holder">
          <input
            className="custom-radio-input"
            id="artist"
            type="radio"
            name="my-radio-group"
          />
          <label className="custom-radio-wrapper" htmlFor="artist">
            <div className="custom-radio">
              <div className="inner">Artiste</div>
            </div>
          </label>

          <input
            className="custom-radio-input"
            id="user"
            type="radio"
            name="my-radio-group"
          />
          <label className="custom-radio-wrapper" htmlFor="user">
            <div className="custom-radio">
              <div className="inner">User</div>
            </div>
          </label>

          <input
            className="custom-radio-input"
            id="place"
            type="radio"
            name="my-radio-group"
          />
          <label className="custom-radio-wrapper" htmlFor="lieux">
            <div className="custom-radio">
              <div className="inner">Lieux</div>
            </div>
          </label>
        </div>

        <form className="signin-form">
          <div className="input-group">
            <input type="text" required autoComplete="off" />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-group">
            <input type="email" required autoComplete="on" />
            <label htmlFor="Email">Email</label>
          </div>
          <div className="input-group">
            <input type="password" required autoComplete="off" />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <div className="input-group">
            <input type="password" required autoComplete="off" />
            <label htmlFor="verified-password">Vérifier mot de passe</label>
          </div>
        </form>
        <button type="button" className="signin-button">
          S'inscrire
        </button>
        <Link to="/login-page">Déjà un compte ? Connectez-vous</Link>
      </section>
    </main>
  );
}

export default SignInForm;
