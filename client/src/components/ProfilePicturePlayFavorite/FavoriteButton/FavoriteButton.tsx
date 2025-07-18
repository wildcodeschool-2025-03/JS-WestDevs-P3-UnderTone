import { useEffect, useState } from "react";
import "./FavoriteButton.css";
import { useLocation, useParams } from "react-router";

function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();
  const [targetStatus, setTargetStatus] = useState("");
  const targetId = useParams().id;

  useEffect(() => {
    setTargetStatus(
      location.pathname.includes("artist") ? "artist" : "concert_place",
    );
  }, [location]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/favorites/${targetId}/${targetStatus}`, {
      credentials: "include",
    }).then((res) => setIsFavorite(res.ok));
  }, [targetId, targetStatus]);

  const handleChange = () => {
    const method = isFavorite ? "DELETE" : "POST";

    fetch(`http://localhost:3310/api/favorites/${targetId}/${targetStatus}`, {
      method,
      credentials: "include",
    })
      .then(() => setIsFavorite(!isFavorite))
      .catch(console.error);
  };

  return (
    <button type="button" className="favorite-toggle-container">
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
    </button>
  );
}

export default FavoriteButton;
