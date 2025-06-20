import "./SignInForm.css";

function SignInForm() {
  return (
    <div className="container">
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
          name="nom"
          aria-label="Nom"
          placeholder="Nom"
          id="name"
        />
        <input
          type="text"
          name="identifiant"
          aria-label="Identifiant"
          placeholder="Identifiant"
          id="id"
        />
        <input
          type="email"
          name="email"
          aria-label="Email"
          placeholder="Email"
          id="email"
        />
        <input
          type="text"
          name="mot de passe"
          aria-label="Mot de passe"
          placeholder="Mot de passe"
          id="password"
        />
      </form>
      <button type="button">s'inscrire</button>
      <a href="lklsf">Déjà un compte ? Connectez-vous</a>
    </div>
  );
}

export default SignInForm;
