import "./EventValidationPage.css";

function EventValidationPage() {
  return (
    <section className="event_validation">
      <div>
        <img
          src="images/Photo event.svg"
          alt="un batteur avec ses instruments"
        />

        <section className="event_text">
          <p>
            <strong>Vent Débarasse</strong>&nbsp;
            <span>vous invite pour son évènement</span>&nbsp;
            <span>
              <strong>Soirée Funk!</strong>
            </span>
          </p>
          <p>
            <strong>21 juin 2025</strong>
          </p>
          <p>
            <strong>20h</strong>
          </p>
          <p>Serez-vous présent?</p>
          <article className="validate_event">
            <button type="button">Refuser</button>
            <button type="button">Accepter</button>
          </article>
        </section>
      </div>
    </section>
  );
}
export default EventValidationPage;
