import { useRef, useState } from "react";
import "./InputMenu.css";

function InputMenu() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    event.target.files?.length &&
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    console.log(fileInputRef.current?.files?.length);
  };

  return (
    <div className="input-group">
      <label htmlFor="menu">Menu | Carte</label>
      <input
        className={fileInputRef.current?.files?.length ? "filled" : undefined}
        type="file"
        name="menu"
        id="menu-file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <label htmlFor="menu-file">
        {imageSrc ? (
          <iframe src={imageSrc} width={130} height={130} title="Aperçu PDF" />
        ) : (
          <>
            <p>Cliquez pour ajouter un fichier</p>
            <div />
          </>
        )}
      </label>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : (
        <p>* format .pdf uniquement, Max. 2Mo</p>
      )}
    </div>
  );
}

export default InputMenu;
