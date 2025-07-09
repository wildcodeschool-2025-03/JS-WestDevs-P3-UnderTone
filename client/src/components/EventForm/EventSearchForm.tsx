import { useState } from "react";
import "./EventSearchForm.css";

function EventSearchForm() {
  const [radius, setRadius] = useState("1");
  const handleRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(e.target.value);
  };
  return (
    <form action="Submit">
      <div className="input-group">
        <input type="text" name="town" id="town" required autoComplete="off" />
        <label htmlFor="town">Ville</label>
      </div>

      <div className="input-group">
        <input
          type="range"
          name="rayon"
          id="rayon"
          required
          autoComplete="off"
          placeholder="Rayon"
          min={1}
          max={50}
          onChange={handleRadius}
          value={radius}
        />
        <label htmlFor="rayon">Rayon: {radius} km</label>
      </div>

      <div className="input-group">
        <input
          type="date"
          name="date"
          id="date"
          required
          autoComplete="on"
          placeholder="Date"
        />
        <label htmlFor="date">Date</label>
      </div>

      <button type="submit">Rechercher</button>
    </form>
  );
}

export default EventSearchForm;
