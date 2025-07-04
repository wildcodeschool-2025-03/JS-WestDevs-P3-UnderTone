import "./Research.css";

function Research() {
  return (
    <main className="research-page">
      <form>
        <div>
          <input type="radio" id="Artiste" name="recherche" value="Artiste" />
          <label htmlFor="Artiste">
            <span>Artiste</span>
          </label>

          <input
            type="radio"
            id="Evenement"
            name="recherche"
            value="Évènement"
          />
          <label htmlFor="Evenement">
            <span>Évènement</span>
          </label>

          <input type="radio" id="Lieu" name="recherche" value="Lieu" />
          <label htmlFor="Lieu">
            <span>Lieu</span>
          </label>
        </div>
      </form>
    </main>
  );
}

export default Research;
