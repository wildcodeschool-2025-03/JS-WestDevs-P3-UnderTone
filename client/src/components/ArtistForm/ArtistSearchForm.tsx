import "./ArtistSearchForm.css";

function ArtistSearchForm() {
  return (
    <form action="submit">
      <div className="input-group">
        <input type="text" name="name" id="name" required autoComplete="off" />
        <label htmlFor="name">nom</label>
      </div>

      <div className="input-group">
        <select name="style" id="style" required autoComplete="off">
          <option value="">--Genre Musical--</option>
          <option value="funk">funk</option>
          <option value="rock">rock</option>
          <option value="jazz">jazz</option>
          <option value="musique du monde">musique du monde</option>
        </select>
      </div>

      <button type="submit">Rechercher</button>
    </form>
  );
}

export default ArtistSearchForm;
