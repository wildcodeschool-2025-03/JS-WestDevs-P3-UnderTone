import { useState } from "react";
import "./Home.css";
import { Link } from "react-router";

function Home() {
  const [choiceStatus, setChoiceStatus] = useState("spectateur");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoiceStatus(e.target.value);
  };

  const getMessage = () => {
    switch (choiceStatus) {
      case "spectateur":
        return (
          <article>
            <p>
              Grace à <strong>UnderTone</strong> il est désormais possible de
              trouver une soirée <strong>rapidement</strong> et{" "}
              <strong>facilement</strong> !
            </p>
            <p>
              Et la découverte ? On est sûrs que vous ne connaisez pas tous les{" "}
              <strong>artistes</strong> de <strong>votre région</strong> !
            </p>
            <p>
              Ici la <strong>musique</strong> est au premier plan !
            </p>
          </article>
        );

      case "artist":
        return (
          <article>
            <p>
              Grâce à <strong>Undertone</strong>, faites découvrir votre univers
              musical <strong>au grand public</strong> !
            </p>
            <p>
              En jouant dans des établissements de votre région, vous touchez de{" "}
              <strong>nouveaux publics</strong> à chaque prestation.
            </p>
            <p>
              Ici, les artistes sont{" "}
              <strong>visibles, écoutés, et valorisés</strong> !
            </p>
          </article>
        );

      case "ets-status":
        return (
          <article>
            <p>
              Grâce à <strong>Undertone</strong>, mettez en avant votre
              établissement en accueillant des artistes locaux pour{" "}
              <strong>animer vos soirées</strong> !{" "}
            </p>
            <p>
              Vous <strong>attirez</strong> de nouveaux publics et faites vivre
              la scène musicale de votre région.{" "}
            </p>
            <p>
              Ici, votre établissement devient un vrai{" "}
              <strong>lieu de découverte</strong> musicale !
            </p>
          </article>
        );

      default:
        return null;
    }
  };

  return (
    <main className="home-page">
      <div className="home-content">
        <img src="/images/home_image.svg" alt="Table de mixage de musique" />
        <div className="status-user-form">
          <form>
            <h2>
              <strong>Je suis un :</strong>
            </h2>
            <div className="custom-radio-holder">
              <input
                type="radio"
                id="spectateur"
                name="status"
                value="spectateur"
                onChange={handleChange}
                checked={choiceStatus === "spectateur"}
                className="custom-radio-input"
              />
              <label htmlFor="spectateur" className="custom-radio-wrapper">
                <div className="custom-radio">
                  <div className="inner">Spectateur</div>
                </div>
              </label>

              <input
                type="radio"
                id="artist"
                name="status"
                value="artist"
                onChange={handleChange}
                checked={choiceStatus === "artist"}
                className="custom-radio-input"
              />
              <label htmlFor="artist" className="custom-radio-wrapper">
                <div className="custom-radio">
                  <div className="inner">Artiste</div>
                </div>
              </label>

              <input
                type="radio"
                id="ets-status"
                name="status"
                value="ets-status"
                onChange={handleChange}
                checked={choiceStatus === "ets-status"}
                className="custom-radio-input"
              />
              <label htmlFor="ets-status" className="custom-radio-wrapper">
                <div className="custom-radio">
                  <div className="inner">Établissement</div>
                </div>
              </label>
            </div>
          </form>

          {choiceStatus && getMessage()}

          <section className="home-links">
            <div>
              <Link to="/app/signin">
                <strong>Inscription</strong>
              </Link>
              <Link to="/app/login">
                <strong>Connexion</strong>
              </Link>
            </div>

            <Link to="/app/research">
              <strong>Accéder à l'application</strong>
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Home;
