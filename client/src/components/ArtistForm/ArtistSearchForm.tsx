import "./ArtistSearchForm.css";

function ArtistForm() {
  return (
    <form action="submit">
      <div className="input-group">
        <input type="text" name="town" id="town" required autoComplete="off" />
        <label htmlFor="town">Ville</label>
      </div>

      <div className="input-group">
        <select name="style" id="style" required autoComplete="off" />
        <label htmlFor="rayon">Genre musical</label>
      </div>

      <div className="input-group">
        <select
          name="departement"
          id="departement"
          required
          autoComplete="on"
        />
        <label htmlFor="date">Date</label>
      </div>

      <button type="submit">Rechercher</button>
    </form>
  );
}

export default ArtistForm;
