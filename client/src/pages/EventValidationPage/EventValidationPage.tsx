import "./EventValidationPage.css";

function EventValidationPage() {
  return (
    <main className="event-validation">
      <div className="card">
        <img
          src="/images/event-photo.png"
          alt="un batteur avec ses instruments"
        />

        <section className="event-text">
          <p>
            <strong>Vent Débarasse</strong> vous invite pour son évènement{" "}
            <strong>Soirée Funk !</strong>
          </p>
          <p>
            <strong>21 juin 2025</strong>
          </p>
          <p>
            <strong>20h</strong>
          </p>
          <p>Serez-vous présent?</p>
          <div className="buttons-container">
            <button type="button">Refuser</button>
            <button type="button">Accepter</button>
          </div>
        </section>
      </div>
    </main>
  );
}
export default EventValidationPage;
