import "./EventValidationPage.css";

function EventValidationPage() {
  return (
    <main className="event_validation">
      <figure>
        <img
          src="images/Photo event.svg"
          alt="un batteur avec ses instruments"
        />
      </figure>

      <section>
        <article>
          <h1>Vent Débarasse</h1>
          <p>vous invite pour son évènement</p>
          <h2>Soirée Funk !</h2>
        </article>
        <h3>21 juin 2025</h3>
        <h3>20h</h3>
        <p>Serez-vous présent?</p>
        <article className="validate_event">
          <button type="button">Refuser</button>
          <button type="button">Accepter</button>
        </article>
      </section>
    </main>
  );
}
export default EventValidationPage;
