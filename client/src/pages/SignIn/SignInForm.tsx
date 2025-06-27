import { Link } from "react-router";
import "./SignInForm.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignInForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (formData: FormData) => {
    const data = JSON.stringify(Object.fromEntries(formData));

    fetch("http://localhost:3310/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }).then((res) =>
      res.ok
        ? toast.success("Félicitations, votre compte a été créé")
        : toast.error("Erreur lors de l'inscription"),
    );
  };

  return (
    <main className="signin-page">
      <section className="form-container">
        <h1>Inscription</h1>

        <form className="signin-form" action={handleSubmit}>
          <div className="custom-radio-holder">
            <input
              className="custom-radio-input"
              id="artist"
              type="radio"
              name="role"
              value="artist"
            />
            <label className="custom-radio-wrapper" htmlFor="artist">
              <div className="custom-radio">
                <div className="inner">Artiste</div>
              </div>
            </label>

            <input
              defaultChecked={true}
              className="custom-radio-input"
              id="user"
              type="radio"
              name="role"
              value="user"
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
              name="role"
              value="place"
            />
            <label className="custom-radio-wrapper" htmlFor="place">
              <div className="custom-radio">
                <div className="inner">Lieux</div>
              </div>
            </label>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="username"
              id="username"
              required
              autoComplete="off"
            />
            <label htmlFor="username">Name</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              id="identifier"
              name="identifier"
              required
              autoComplete="off"
            />
            <label htmlFor="identifier">Identifiant</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="on"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input
              className={
                password !== confirmPassword ? "different-passwords" : undefined
              }
              type="password"
              id="password"
              name="password"
              required
              autoComplete="off"
              onChange={handlePassword}
              value={password}
              pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
            />
            <label htmlFor="password">Mot de passe</label>
            <p>
              Le mot de passe doit contenir entre 8 et 16 caractères, inclure
              des majuscules, des minuscules, des chiffres et des caractères
              spéciaux, sans espaces.
            </p>
          </div>
          <div className="input-group">
            <input
              className={
                password !== confirmPassword ? "different-passwords" : undefined
              }
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              autoComplete="off"
              onChange={handleConfirmPassword}
              value={confirmPassword}
              pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
            />
            <label htmlFor="confirmPassword">Vérifier mot de passe</label>
            <ul>
              <li>
                Le mot de passe doit contenir entre 8 et 16 caractères, inclure
                des majuscules, des minuscules, des chiffres et des caractères
                spéciaux, sans espaces.
              </li>
              <li>Les mots de passe ne correspondent pas</li>
            </ul>
          </div>

          <button type="submit" className="signin-button">
            S'inscrire
          </button>
        </form>

        <Link to="/login-page">Déjà un compte ? Connectez-vous</Link>
      </section>
    </main>
  );
}

export default SignInForm;
