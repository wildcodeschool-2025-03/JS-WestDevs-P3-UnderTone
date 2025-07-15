import { toast } from "react-toastify";
import "../../assets/styles/forms.css";
import { useAuth } from "../../services/AuthContext";
import "./Login.css";
import { Link } from "react-router";

function Login() {
  const { setIsLogged, setUser } = useAuth();

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData);

    fetch("http://localhost:3310/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          toast.error("Connexion échouée");
          throw new Error("Login failed");
        }
        if (res.ok) {
          toast.success("Félicitation, vous êtes connecté !");
          setIsLogged(true);
          return res.json();
        }
      })
      .then((data: UserData) => setUser(data.result))
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <main className="login-page">
      <section>
        <h1>Connexion</h1>
        <form action={handleSubmit}>
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
