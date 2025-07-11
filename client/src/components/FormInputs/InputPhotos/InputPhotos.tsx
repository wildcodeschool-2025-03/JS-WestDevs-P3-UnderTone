import { useRef, useState } from "react";
import "./InputPhotos.css";

function InputPhotos() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = () => {
    if (!fileInputRef.current) return;

    const files = fileInputRef.current.files;

    if (files && files.length > 0) {
      const hasLargeFile = Array.from(files).some(
        (file) => file.size / (1024 * 1024) > 2,
      );

      if (hasLargeFile) {
        setErrorMessage("Chaque fichier doit faire moins de 2 Mo.");
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
        name="photos"
        id="photos"
        accept=".jpg, .jpeg, .png"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <label htmlFor="photos">Photos</label>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : (
        <p>* formats .jpg, .jpeg, .png uniquement, Max. 2Mo/fichier</p>
      )}
    </div>
  );
}

export default InputPhotos;
