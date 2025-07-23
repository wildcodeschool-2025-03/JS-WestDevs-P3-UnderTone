import { useRef, useState } from "react";
import "./InputEventPicture.css";

function InputEventPicture() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = () => {
    if (!fileInputRef.current) return;

    const file = fileInputRef.current.files?.[0];

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);

      if (fileSizeInMB > 2) {
        setErrorMessage(
          "Le fichier dépasse 2 Mo. Veuillez choisir une image plus légère.",
        );
        fileInputRef.current.value = "";
      } else {
        setErrorMessage("");
      }
    }
  };

  return (
    <div className="input-group">
      <input
        type="file"
        name="event_picture"
        id="event-picture-input"
        accept=".jpg, .jpeg, .png"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <label htmlFor="event-picture-input">Photo / Affiche</label>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : (
        <p>* formats .jpg, .jpeg ou .png uniquement, 2Mo max</p>
      )}
    </div>
  );
}

export default InputEventPicture;
