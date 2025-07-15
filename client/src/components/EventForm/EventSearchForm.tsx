import { useEffect, useState } from "react";
import "./EventSearchForm.css";

interface EventType {
  id: string | number;
  name: string;
}

interface FormDataType {
  date: string;
}

function EventSearchForm() {
  const [formObj, setFormObj] = useState<FormDataType | null>(null);
  const [filteredEventList, setFilteredEventList] = useState<EventType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const date = formData.get("date")?.toString() || "";
    setFormObj({ date });
  };

  useEffect(() => {
    if (!formObj) return;

    const params = new URLSearchParams();

    const queryTimer = setTimeout(() => {
      for (const [key, value] of Object.entries(formObj)) {
        params.append(key, value);
      }

      fetch(`http://localhost:3310/api/search/event?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => setFilteredEventList(data))
        .catch((error) =>
          console.error("Erreur lors de la recherche :", error),
        );
    }, 1500);

    return () => clearTimeout(queryTimer);
  }, [formObj]);

  return (
    <form onChange={handleChange}>
      <div className="input-group">
        <input
          type="date"
          name="date"
          id="date"
          required
          autoComplete="on"
          placeholder="date"
        />
        <label htmlFor="date">date</label>
      </div>

      <section>
        <h2>Résultats</h2>
        <ul>
          {filteredEventList.length ? (
            filteredEventList.map((event) => (
              <li key={event.id}>{event.name}</li>
            ))
          ) : (
            <li>Aucun évènement ne correspond à la date indiquée</li>
          )}
        </ul>
      </section>
    </form>
  );
}

export default EventSearchForm;
