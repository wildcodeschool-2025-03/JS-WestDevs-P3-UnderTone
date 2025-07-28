import { useEffect, useRef, useState } from "react";
import { Hint } from "react-autocomplete-hint";
import { toast } from "react-toastify";
import "./MusicalInfluencesForm.css";

function MusicalInfluencesForm({
  selectedStyles,
  setSelectedStyles,
}: {
  selectedStyles: StyleArtistCreation[];
  setSelectedStyles: (styles: StyleArtistCreation[]) => void;
}) {
  const [styles, setStyles] = useState<{ id: number; label: string }[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3310/api/music-styles")
      .then((res) => res.json())
      .then((data) => setStyles(data));
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

  const styleInputRef = useRef<HTMLInputElement>(null);

  const handleAddStyle = () => {
    const inputValue = styleInputRef.current ? styleInputRef.current.value : "";
    const styleToAdd = styles.find((style) => style.label === inputValue);

    if (styleToAdd && !selectedStyles.some((s) => s.id === styleToAdd.id)) {
      setSelectedStyles([...selectedStyles, styleToAdd]);
      setText("");
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const idToDelete = (e.currentTarget as HTMLButtonElement).dataset.id;
    setSelectedStyles(
      selectedStyles.filter((ss) => ss.id !== Number(idToDelete)),
    );
  };

  const handleCreateStyle = () => {
    const newStyle = { name: styleInputRef.current?.value };

    newStyle &&
      fetch("http://localhost:3310/api/new/style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStyle),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Nouveau style créé 🔥🎵");
          } else {
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          setStyles([...styles, data]);
          setSelectedStyles([...selectedStyles, data]);
          setText("");
        })
        .catch(() => {
          toast.error("Échec de la création de style 😫");
        });
  };

  return (
    <section className="influences-section">
      <h2>Mes Influences Musicales</h2>
      <div className="input-group">
        <Hint options={styles} allowTabFill={true}>
          <input
            value={text}
            onChange={handleHintChange}
            ref={styleInputRef}
            aria-label="Style"
            placeholder=""
          />
        </Hint>
      </div>
      <div className="buttons-wrapper">
        <button type="button" onClick={handleCreateStyle}>
          Nouveau
        </button>
        <button type="button" onClick={handleAddStyle}>
          Valider
        </button>
      </div>
      {selectedStyles.length > 0 && (
        <ul>
          {selectedStyles.map((ss) => (
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

export default MusicalInfluencesForm;
