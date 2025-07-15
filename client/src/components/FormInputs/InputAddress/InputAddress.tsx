import "./InputAddress.css";

function InputAddress() {
  return (
    <div className="input-group">
      <input
        type="text"
        name="address"
        id="address"
        required
        placeholder=""
        maxLength={200}
      />
      <label htmlFor="address">Adresse</label>
    </div>
  );
}

export default InputAddress;
