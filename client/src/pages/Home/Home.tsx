import { useState } from "react";
import "./Home.css";

function Home() {
  const [choicestatus, setChoicestatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoicestatus(e.target.value);
  };

  // Texte personnalisé selon le statut sélectionné
  const getMessage = () => {
    switch (choicestatus) {
      case "spectateur":
        return "Bienvenue cher spectateur ! Explorez les évènements à venir.";
      case "artist":
        return "Bienvenue artiste ! Connectez-vous ou créez votre profil.";
      case "ets-status":
        return "Bienvenue établissement ! Inscrivez votre lieu et programmez vos concerts.";
      default:
        return "";
    }
  };

  return (
    <main className="status-user">
      <div className="home-content">
        <img
          src="/images/home_image.svg"
          alt="Accueil"
          className="home-image"
        />

        <form>
          <p>
            <strong>Je suis un</strong>
          </p>
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

        {/* Affichage du message */}
        {choicestatus && (
          <div className="message-zone">
            <p>{getMessage()}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;

/*import { useState } from "react";
import "./Home.css";

function Home() {
    const [choicestatus, setChoicestatus] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  return (
    <>
      <main className="status-user">
        <div>
          <img src="/images/home_image.svg" alt="" />

          <form>
            <p>
              <strong>Je suis un</strong>
            </p>
            <div>
              <input
                type="radio"
                id="spectateur"
                name="status"
                value="spectateur"
                 onChange={handleChange}
                checked={choicestatus === "Spectateur"}
              />
              <label htmlFor="spectateur">
                <span>Spectateur</span>
              </label>

              <input
                type="radio"
                id="artist"
                name="status"
                value="artist"
                // onChange={handleChange}
                // checked={choicestatus === "artist"}
              />
              <label htmlFor="artist">
                <span>Artiste</span>
              </label>

              <input
                type="radio"
                id="ets-status"
                name="status"
                value="ets-status"
                // onChange={handleChange}
                // checked={choicestatus === "ets-status"}
              />
              <label htmlFor="ets-status">
                <span>Établissement</span>
              </label>
            </div>
          </form>

          {/* {choicestatus === "event" && <EventSearchForm />} 
        </div>
      </main>
    </>
  );
}
export default Home;*/
