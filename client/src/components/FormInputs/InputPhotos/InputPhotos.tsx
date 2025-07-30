import { useRef, useState } from "react";
import "./InputPhotos.css";

function InputPhotos() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    if (event.target.files?.length) {
      const images = [];
      for (const file of event.target.files) {
        images.push(URL.createObjectURL(file));
      }
      setImagesSrc(images);
    }
  };

  return (
    <div className="input-group">
      <label htmlFor="photos">Photos</label>
      <input
        className={fileInputRef.current?.files?.length ? "filled" : undefined}
        type="file"
        name="photos"
        id="photos"
        accept=".jpg, .jpeg, .png"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <label htmlFor="photos">
        {imagesSrc.length ? (
          <div className="images">
            {imagesSrc.map((image) => (
              <img src={image} alt="Fichier à upload" key={image} />
            ))}
          </div>
        ) : (
          <div>
            <p>Cliquez pour ajouter une ou plusieurs photo(s)</p>
            <div />
          </div>
        )}
      </label>
      {errorMessage ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : (
        <p>* formats .jpg, .jpeg, .png uniquement, Max. 2Mo/fichier</p>
      )}
    </div>
  );
}

export default InputPhotos;
