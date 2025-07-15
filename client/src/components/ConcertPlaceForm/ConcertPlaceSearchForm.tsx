import { useEffect, useRef, useState } from "react";

function ConcertPlaceSearchForm() {
  const [typeList, setTypeList] = useState<StyleTypes[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/types")
      .then((res) => res.json())
      .then((data) => setTypeList(data));
  }, []);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const typeInputRef = useRef<HTMLSelectElement>(null);
  const [formObj, setFormObj] = useState<ConcertPlaceFormDataType | null>(null);
  const [filteredConcertPlaceList, setFilteredConcertPlaceList] = useState<
    FilteredConcertPlaceList[]
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const type = formData.get("type")?.toString() || "";

    setFormObj({ name, type });
  };

  useEffect(() => {
    if (!formObj) return;
    console.log(filteredConcertPlaceList);
    const params = new URLSearchParams();

    const queryTimer = setTimeout(() => {
      for (const [key, value] of Object.entries(formObj)) {
        params.append(key, value);
      }
      fetch(`/api/search/artist?${params}`)
        .then((res) => res.json())
        .then((data) => setFilteredConcertPlaceList(data));
    }, 1500);

    return () => clearTimeout(queryTimer);
  }, [formObj, filteredConcertPlaceList]);

  return (
    <form onChange={handleChange}>
      <div className="input-group">
        <input
          type="text"
          name="name"
          ref={nameInputRef}
          id="name"
          required
          autoComplete="off"
        />
        <label htmlFor="name">nom</label>
      </div>

      <div className="input-group">
        <select
          name="type"
          id="type"
          ref={typeInputRef}
          required
          autoComplete="off"
        >
          <option value="">--Type d'établissement--</option>
          {typeList.length &&
            typeList.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
        </select>
      </div>
      <section>
        <h2>Résultats</h2>
        <ul>
          {filteredConcertPlaceList.length ? (
            filteredConcertPlaceList.map((concert_place) => (
              <li key={concert_place.id}>{concert_place.name}</li>
            ))
          ) : (
            <li>Aucun Lieu ne correspond à la recherche</li>
          )}
        </ul>
      </section>
    </form>
  );
}

export default ConcertPlaceSearchForm;
