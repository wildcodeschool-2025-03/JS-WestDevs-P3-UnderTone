import { useState } from "react";
import "./Research.css";
import EventForm from "../../components/EventForm/EventForm";

function Research() {
  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
  };

  return (
    <main className="research-page">
      <form>
        <div>
          <input
            type="radio"
            id="Artiste"
            name="recherche"
            value="Artiste"
            onChange={handleChange}
            checked={selectedRole === "Artiste"}
          />
          <label htmlFor="Artiste">
            <span>Artiste</span>
          </label>

          <input
            type="radio"
            id="Evenement"
            name="recherche"
            value="Évènement"
            onChange={handleChange}
            checked={selectedRole === "Évènement"}
          />
          <label htmlFor="Evenement">
            <span>Évènement</span>
          </label>

          <input
            type="radio"
            id="Lieu"
            name="recherche"
            value="Lieu"
            onChange={handleChange}
            checked={selectedRole === "Lieu"}
          />
          <label htmlFor="Lieu">
            <span>Lieu</span>
          </label>
        </div>
      </form>

      {selectedRole === "Évènement" && <EventForm />}
    </main>
  );
}

export default Research;
