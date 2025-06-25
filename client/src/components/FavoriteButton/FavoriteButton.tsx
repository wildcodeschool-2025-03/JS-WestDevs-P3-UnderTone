import { useState } from "react";
import "./FavoriteButton.css";

function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleChange = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="favorite-toggle-container">
      <div className="love">
        <input
          id="switch"
          type="checkbox"
          aria-label="Ajouter aux favoris"
          checked={isFavorite}
          onChange={handleChange}
        />
        <label className="love-heart" htmlFor="switch">
          <i className="left" />
          <i className="right" />
          <i className="bottom" />
          <div className="round" />
        </label>
      </div>
    </div>
  );
}

export default FavoriteButton;
