import "./InputsDateHour.css";

function InputsDateHour() {
  return (
    <div className="date-hour-inputs">
      <div className="input-group">
        <input type="date" name="date" id="date-input" />
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
