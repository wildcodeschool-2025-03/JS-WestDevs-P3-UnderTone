import { useState } from "react";
import "./Research.css";
import ArtistSearchForm from "../../components/ArtistForm/ArtistSearchForm";
import ConcertPlaceSearchForm from "../../components/ConcertPlaceForm/ConcertPlaceSearchForm";
import EventSearchForm from "../../components/EventForm/EventSearchForm";

function Research() {
  const [selectedRole, setSelectedRole] = useState("event");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
  };

  return (
    <main className="research-page">
      <form>
        <div>
          <input
            type="radio"
            id="artist"
            name="research"
            value="artist"
            onChange={handleChange}
            checked={selectedRole === "artist"}
          />
          <label htmlFor="artist">
            <span>Artiste</span>
          </label>

          <input
            type="radio"
            id="event"
            name="research"
            value="event"
            onChange={handleChange}
            checked={selectedRole === "event"}
          />
          <label htmlFor="event">
            <span>Évènement</span>
          </label>

          <input
            type="radio"
            id="concert-place"
            name="research"
            value="concert-place"
            onChange={handleChange}
            checked={selectedRole === "concert-place"}
          />
          <label htmlFor="concert-place">
            <span>Lieu</span>
          </label>
        </div>
      </form>

      {selectedRole === "event" && <EventSearchForm />}
      {selectedRole === "artist" && <ArtistSearchForm />}
      {selectedRole === "concert-place" && <ConcertPlaceSearchForm />}
    </main>
  );
}

export default Research;
