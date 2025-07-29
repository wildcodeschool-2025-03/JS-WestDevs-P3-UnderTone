import { useEffect, useState } from "react";
import "./Research.css";
import ArtistSearchForm from "../../components/ArtistForm/ArtistSearchForm";
import ConcertPlaceSearchForm from "../../components/ConcertPlaceForm/ConcertPlaceSearchForm";
import EventSearchForm from "../../components/EventForm/EventSearchForm";

function Research() {
  const [selectedRole, setSelectedRole] = useState("event");
  const [todayDate, setTodayDate] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
  };

  useEffect(() => {
    if (selectedRole === "event") {
      const currentDate = new Date().toISOString().split("T")[0];
      setTodayDate(currentDate);
    }
  }, [selectedRole]);

  return (
    <main className="research-page">
      <form>
        <div className="custom-radio-holder">
          <input
            type="radio"
            id="artist"
            name="research"
            value="artist"
            className="custom-radio-input"
            onChange={handleChange}
            checked={selectedRole === "artist"}
          />
          <label htmlFor="artist" className="custom-radio-wrapper">
            <div className="custom-radio">
              <div className="inner">Artiste</div>
            </div>
          </label>

          <input
            type="radio"
            id="event"
            name="research"
            value="event"
            className="custom-radio-input"
            onChange={handleChange}
            checked={selectedRole === "event"}
          />
          <label htmlFor="event" className="custom-radio-wrapper">
            <div className="custom-radio">
              <div className="inner">Évènement</div>
            </div>
          </label>

          <input
            type="radio"
            id="concert-place"
            name="research"
            value="concert-place"
            className="custom-radio-input"
            onChange={handleChange}
            checked={selectedRole === "concert-place"}
          />
          <label htmlFor="concert-place" className="custom-radio-wrapper">
            <div className="custom-radio">
              <div className="inner">Lieu</div>
            </div>
          </label>
        </div>
      </form>

      {selectedRole === "event" && <EventSearchForm defaultDate={todayDate} />}
      {selectedRole === "artist" && <ArtistSearchForm />}
      {selectedRole === "concert-place" && <ConcertPlaceSearchForm />}
    </main>
  );
}

export default Research;
