import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router";
import "./SignInForm.css";

function SignInForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData({ ...formData, role: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Inscription réussie !");
      } else {
        alert(result.message || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <main className="signin-page">
      <section className="form-container">
        <h1>Inscription</h1>

        <div className="custom-radio-holder">
          <input
            className="custom-radio-input"
            id="artist"
            type="radio"
            name="role"
            value="artist"
            onChange={handleChange}
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
            name="role"
            value="user"
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <label className="custom-radio-wrapper" htmlFor="place">
            <div className="custom-radio">
              <div className="inner">Lieux</div>
            </div>
          </label>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="on"
            />
            <label htmlFor="Email">Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <label htmlFor="verified-password">Vérifier mot de passe</label>
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
