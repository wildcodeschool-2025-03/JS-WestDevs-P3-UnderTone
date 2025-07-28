import "./InputDemo.css";
import { useState } from "react";

function InputDemo() {
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024 && file.type === "audio/mpeg") {
      setError("");
    } else {
      setError("Fichier trop volumineux : 2Mo max");
    }
  };

  return (
    <div className="input-group">
      <input
        type="file"
        id="demo-input"
        accept=".mp3"
        onChange={handleFileChange}
      />
      <label htmlFor="demo-input">Démo</label>
      {error ? <p>{error}</p> : <p>* format .mp3, Max 2Mo</p>}
    </div>
  );
}

export default InputDemo;
