import { useEffect, useRef, useState } from "react";
import { Hint } from "react-autocomplete-hint";
import "./InputInviteArtist.css";

function InputInviteArtist({
  artistsToInvite,
  setArtistsToInvite,
}: {
  artistsToInvite: ArtistsToInvite;
  setArtistsToInvite: (list: ArtistsToInvite) => void;
}) {
  const [artistList, setArtistList] = useState<{ id: number; label: string }[]>(
    [],
  );
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3310/api/artist")
      .then((res) => res.json())
      .then((data) => setArtistList(data));
  }, []);

  const handleHintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = "";
    if (!e.target.value.length) {
      newValue = e.target.value;
    } else if (e.target.value.length) {
      newValue =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    }
    setText(newValue);
  };

  const inviteArtistInputRef = useRef<HTMLInputElement>(null);

  const handleAddArtist = () => {
    const inputValue = inviteArtistInputRef.current
      ? inviteArtistInputRef.current.value
      : "";
    const artistToAdd = artistList.find(
      (artist) => artist.label === inputValue,
    );

    if (artistToAdd && !artistsToInvite.some((s) => s.id === artistToAdd.id)) {
      setArtistsToInvite([...artistsToInvite, artistToAdd]);
      setText("");
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const idToDelete = (e.currentTarget as HTMLButtonElement).dataset.id;
    setArtistsToInvite(
      artistsToInvite.filter((ss) => ss.id !== Number(idToDelete)),
    );
  };

  return (
    <section className="invite-artist-section">
      <label htmlFor="invite-artist-input">Artistes à inviter</label>
      <Hint options={artistList}>
        <input
          value={text}
          onChange={handleHintChange}
          ref={inviteArtistInputRef}
          id="invite-artist-input"
        />
      </Hint>
      <button type="button" onClick={handleAddArtist}>
        Valider
      </button>
      {artistsToInvite.length > 0 && (
        <ul>
          {artistsToInvite.map((ss) => (
            <li key={ss.id}>
              <p>{ss.label}</p>
              <button type="button" data-id={ss.id} onClick={handleDelete}>
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default InputInviteArtist;
