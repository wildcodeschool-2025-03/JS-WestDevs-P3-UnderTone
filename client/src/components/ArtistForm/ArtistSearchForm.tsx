import { useEffect, useRef, useState } from "react";
import ArtistSearchResult from "../ArtistSearchResult/ArtistSearchResult";
import "./ArtistSearchForm.css";

function SearchArtist() {
  const [musicStyleList, setMusicStyleList] = useState<StyleTypes[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/music-styles")
      .then((res) => res.json())
      .then((data) => setMusicStyleList(data));
  }, []);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const musicStyleInputRef = useRef<HTMLSelectElement>(null);
  const [formObj, setFormObj] = useState<ArtistFormDataType | null>(null);
  const [filteredArtistList, setFilteredArtistList] = useState<
    FilteredArtistList[]
  >([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/search/artist")
      .then((res) => res.json())
      .then((data) => setFilteredArtistList(data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const form = e.currentTarget.form as HTMLFormElement | null;
    if (!form) return;

    const formData = new FormData(form);
    const name = formData.get("name")?.toString() || "";
    const musicStyle = formData.get("musicStyle")?.toString() || "";

    setFormObj({ name, musicStyle });
  };

  useEffect(() => {
    if (!formObj?.name && !formObj?.musicStyle) return;
    const params = new URLSearchParams();

    const queryTimer = setTimeout(() => {
      for (const [key, value] of Object.entries(formObj)) {
        if (value) {
          params.append(key, value);
        }
      }
      fetch(`http://localhost:3310/api/search/artist?${params}`)
        .then((res) => res.json())
        .then((data) => setFilteredArtistList(data))
        .catch((err) => console.error("Erreur fetch artist:", err));
    }, 1500);

    return () => clearTimeout(queryTimer);
  }, [formObj]);

  return (
    <form>
      <div className="input-group">
        <input
          type="text"
          name="name"
          ref={nameInputRef}
          id="name"
          placeholder=""
          autoComplete="off"
          onChange={handleChange}
        />
        <label htmlFor="name">Nom</label>
      </div>

      <select
        name="musicStyle"
        id="music-style"
        ref={musicStyleInputRef}
        autoComplete="off"
        onChange={handleChange}
      >
        <option value="">--Genre Musical--</option>
        {musicStyleList.length &&
          musicStyleList.map((musicStyle) => (
            <option key={musicStyle.id} value={musicStyle.label}>
              {musicStyle.label}
            </option>
          ))}
      </select>
      <section className="result">
        <h2>Résultats</h2>
        <ArtistSearchResult artistList={filteredArtistList} />
      </section>
    </form>
  );
}

export default SearchArtist;
