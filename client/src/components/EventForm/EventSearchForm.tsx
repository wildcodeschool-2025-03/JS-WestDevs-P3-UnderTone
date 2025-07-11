import "./EventSearchForm.css";

function EventSearchForm() {
  const handleSubmit = (formData: FormData) => {
    const data = JSON.stringify(Object.fromEntries(formData));
    fetch("http://localhost:3310/api/event/search", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }).then((res) => res.ok);
  };

  return (
    <form action={handleSubmit}>
      <div className="input-group">
        <input
          type="date"
          name="date"
          id="date"
          required
          autoComplete="on"
          placeholder="date"
        />
        <label htmlFor="date">date</label>
      </div>

      <button type="submit">Rechercher</button>
    </form>
  );
}

export default EventSearchForm;
