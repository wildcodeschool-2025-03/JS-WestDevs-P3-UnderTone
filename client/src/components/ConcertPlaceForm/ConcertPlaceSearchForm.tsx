import { useEffect, useRef, useState } from "react";
import ConcertPlaceSearchResult from "../ConcertPlaceSearchResult/ConcertPlaceSearchResult";

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

  useEffect(() => {
    fetch("http://localhost:3310/api/search/concert-place")
      .then((res) => res.json())
      .then((data) => setFilteredConcertPlaceList(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const type = formData.get("type")?.toString() || "";

    setFormObj({ name, type });
  };

  useEffect(() => {
    if (!formObj) return;

    const params = new URLSearchParams();

    const queryTimer = setTimeout(() => {
      for (const [key, value] of Object.entries(formObj)) {
        params.append(key, value);
      }
      fetch(`http://localhost:3310/api/search/concert-place?${params}`)
        .then((res) => res.json())
        .then((data) => setFilteredConcertPlaceList(data));
    }, 1500);

    return () => clearTimeout(queryTimer);
  }, [formObj]);

  return (
    <form onChange={handleChange}>
      <div className="input-group">
        <input
          type="text"
          name="name"
          ref={nameInputRef}
          id="name"
          placeholder=""
          autoComplete="off"
        />
        <label htmlFor="name">Nom</label>
      </div>

      <select
        name="type"
        id="type"
        ref={typeInputRef}
        required
        autoComplete="off"
      >
        <option value="">--Type--</option>
        {typeList.length &&
          typeList.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
      </select>
      <section>
        <h2>Résultats</h2>
        <ConcertPlaceSearchResult concertPlaceList={filteredConcertPlaceList} />
      </section>
    </form>
  );
}

export default ConcertPlaceSearchForm;
