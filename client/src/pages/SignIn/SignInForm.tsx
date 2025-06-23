import "./SignInForm.css";

function SignInForm() {
  return (
    <div className="signinForm-container">
      <section className="form-container">
        <h2>Inscription</h2>

        <div className="customRadioHolder">
          <input
            className="customRadioInput"
            id="artist"
            type="radio"
            name="myRadioGroup"
          />
          <label className="customRadioWrapper" htmlFor="artist">
            <div className="customRadio">
              <div className="inner">Artiste</div>
            </div>
          </label>

          <input
            className="customRadioInput"
            id="user"
            type="radio"
            name="myRadioGroup"
          />
          <label className="customRadioWrapper" htmlFor="user">
            <div className="customRadio">
              <div className="inner">User</div>
            </div>
          </label>

          <input
            className="customRadioInput"
            id="lieux"
            type="radio"
            name="myRadioGroup"
          />
          <label className="customRadioWrapper" htmlFor="lieux">
            <div className="customRadio">
              <div className="inner">Lieux</div>
            </div>
          </label>
        </div>

        <form className="signinform">
          <input
            type="text"
            name="Identifiant"
            aria-label="identifiant"
            placeholder="Identifiant"
            id="identifiant"
          />
          <input
            type="email"
            name="email"
            aria-label="email"
            placeholder="Email"
            id="email"
          />
          <input
            type="text"
            name="mot de passe"
            aria-label="mot de passe"
            placeholder="Mot de passe"
            id="password"
          />
          <input
            type="text"
            name="vérification mot de passe"
            aria-label="Vérification Mot de passe"
            placeholder="Vérifier votre mot de passe"
            id="password"
          />
        </form>
        <button type="button" className="signin-button">
          s'inscrire
        </button>
        <a href="lklsf">Déjà un compte ? Connectez-vous</a>
      </section>
    </div>
  );
}

export default SignInForm;
