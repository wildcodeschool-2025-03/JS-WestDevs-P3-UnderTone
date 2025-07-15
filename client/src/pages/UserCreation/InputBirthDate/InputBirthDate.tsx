import "./InputBirthDate.css";

function InputBirthDate() {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  return (
    <div className="input-group">
      <input type="date" name="birthdate" id="birthdate" max={todayString} />
      <label htmlFor="birthdate">Date de naissance</label>
    </div>
  );
}

export default InputBirthDate;
