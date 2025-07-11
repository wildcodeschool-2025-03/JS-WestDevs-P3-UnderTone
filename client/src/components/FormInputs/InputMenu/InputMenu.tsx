import { useRef, useState } from "react";
import "./InputMenu.css";

function InputMenu() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = () => {
    if (!fileInputRef.current) return;

    const file = fileInputRef.current.files?.[0];

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);

      if (fileSizeInMB > 2) {
        setErrorMessage(
          "Le fichier dépasse 2 Mo. Veuillez choisir un PDF plus léger.",
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
        name="menu"
        id="menu-file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <label htmlFor="menu-file">Carte | Menu</label>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : (
        <p>* format .pdf uniquement, Max. 2Mo</p>
      )}
    </div>
  );
}

export default InputMenu;
