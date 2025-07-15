import { useState } from "react";
import "./Home.css";

function Home() {
  const [choicestatus, setChoicestatus] = useState("spectateur");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoicestatus(e.target.value);
  };

  const getMessage = () => {
    switch (choicestatus) {
      case "spectateur":
        return (
          <p>
            Grace à Undertone, il est désormais
            <br />
            possible de trouver une soirée
            <br />
            rapidement et facilement!
            <span>
              {" "}
              Et la découverte? On est sûrs que vous
              <br />
              ne connaissez pas tous les <strong>artistes</strong> de
              <br />
              <strong>votre région!</strong>
            </span>
            <span>
              Ici la <strong>musique</strong> est au premier plan!
            </span>
          </p>
        );

      case "artist":
        return (
          <p>
            Grâce à Undertone, faites découvrir
            <br />
            votre univers musical <strong>au grand public</strong> !
            <span>
              <br /> En jouant dans des établissements de votre région,
              <br />
              vous touchez de <strong>nouveaux publics</strong> à chaque
              prestation.
            </span>
            <br />
            <span>
              Ici, <strong>les artistes</strong> sont visibles, écoutés, et
              valorisés !
            </span>
          </p>
        );

      case "ets-status":
        return (
          <p>
            Grâce à Undertone, mettez en avant
            <br />
            votre lieu en accueillant des <strong>artistes locaux</strong>
            <br />
            et en animant vos soirées !
            <span>
              {" "}
              Vous attirez de <strong>nouveaux publics</strong>
              <br />
              et faites vivre la scène musicale de votre région.
            </span>
            <br />
            <span>
              {" "}
              Ici, <strong>votre établissement</strong> devient un
              <br />
              vrai lieu de découverte musicale !
            </span>
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <main className="status-user">
      <div className="home-content">
        <img src="/images/home_image.svg" alt="Table de mixage de musique" />
        <div className="status-user-form">
          <form>
            <h2>
              <strong>Je suis un:</strong>
            </h2>
            <div className="radio-options">
              <input
                type="radio"
                id="spectateur"
                name="status"
                value="spectateur"
                onChange={handleChange}
                checked={choicestatus === "spectateur"}
              />
              <label htmlFor="spectateur">
                <span>Spectateur</span>
              </label>

              <input
                type="radio"
                id="artist"
                name="status"
                value="artist"
                onChange={handleChange}
                checked={choicestatus === "artist"}
              />
              <label htmlFor="artist">
                <span>Artiste</span>
              </label>

              <input
                type="radio"
                id="ets-status"
                name="status"
                value="ets-status"
                onChange={handleChange}
                checked={choicestatus === "ets-status"}
              />
              <label htmlFor="ets-status">
                <span>Établissement</span>
              </label>
            </div>
          </form>

          {choicestatus && <div className="message-zone">{getMessage()}</div>}

          <section className="home-buttons">
            <div>
              <button type="button">
                <strong>Inscription</strong>
              </button>
              <button type="button">
                <strong>Connexion</strong>
              </button>
            </div>
            <div>
              <button type="button">
                <strong>Accéder à l'application</strong>
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Home;
