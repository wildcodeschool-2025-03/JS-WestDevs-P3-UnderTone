function Login() {
  return (
    <main className="login-page">
      <form>
        <label htmlFor="email">Identifiant</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ex: bamba@gmail.com"
        />

        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" placeholder="***********" />

        <a href="/reset-password">mot de passe oublié ?</a>

        <button type="submit">Se connecter</button>

        <p>
          Pas encore inscrit ? <a href="/register">Créer un compte</a>
        </p>
      </form>
    </main>
  );
}

export default Login;
