import { useEffect, useState } from "react";
import "./EventSearchForm.css";
import EventSearchResult from "../EventSearchResult/EventSearchResult";

function EventSearchForm() {
  const [formObj, setFormObj] = useState<EventFormDataType | null>(null);
  const [filteredEventList, setFilteredEventList] = useState<EventLinkData[]>(
    [],
  );

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
        .then((data) => {
          for (const event of data) {
            event.date = new Date(event.date);
          }
          setFilteredEventList(data);
        })
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
        <label htmlFor="date">Date</label>
      </div>

      <section>
        <h2>Résultats</h2>
        <EventSearchResult eventList={filteredEventList} />
      </section>
    </form>
  );
}

export default EventSearchForm;
