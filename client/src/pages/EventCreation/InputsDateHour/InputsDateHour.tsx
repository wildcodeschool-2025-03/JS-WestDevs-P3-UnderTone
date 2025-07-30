import { useEffect, useState } from "react";
import "./InputsDateHour.css";

function InputsDateHour() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    setToday(`${yyyy}-${mm}-${dd}`);
  }, []);

  return (
    <div className="date-hour-inputs">
      <div className="input-group">
        <input type="date" name="date" id="date-input" min={today} />
        <label htmlFor="date-input">Date</label>
      </div>
      <div className="input-group">
        <input type="time" name="hour" id="hour-input" />
        <label htmlFor="hour-input">Heure</label>
      </div>
    </div>
  );
}

export default InputsDateHour;
