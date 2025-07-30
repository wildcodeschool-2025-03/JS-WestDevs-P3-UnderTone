import { useRef, useState } from "react";
import "./InputProfilePicture.css";

function InputProfilePicture() {
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
          "Le fichier dépasse 2 Mo. Veuillez choisir une image plus légère.",
        );
        fileInputRef.current.value = "";
      } else {
        setErrorMessage("");
      }
    }
    event.target.files?.length &&
      setImageSrc(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="input-group">
      <label htmlFor="profile_picture">Photo de profil</label>
      <input
        className={fileInputRef.current?.files?.length ? "filled" : undefined}
        type="file"
        name="profile_picture"
        id="profile-picture"
        accept=".jpg, .jpeg, .png"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <label htmlFor="profile-picture">
        {imageSrc ? (
          <img src={imageSrc} alt="Fichier à upload" />
        ) : (
          <>
            <p>Cliquez pour ajouter une photo</p>
            <div />
          </>
        )}
      </label>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : (
        <p>* formats .jpg, .jpeg ou .png uniquement, 2Mo max</p>
      )}
    </div>
  );
}

export default InputProfilePicture;
