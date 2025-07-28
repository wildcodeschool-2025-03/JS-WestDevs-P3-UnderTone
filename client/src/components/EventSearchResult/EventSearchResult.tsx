import { Link } from "react-router";
import "./EventSearchResult.css";

function EventSearchResult({ eventList }: { eventList: EventLinkData[] }) {
  return (
    <ul className="result">
      {eventList.length ? (
        eventList.map((event) => (
          <li key={event.id}>
            <Link to={`/app/event/${event.id}`}>
              {event.image && <img src={event.image} alt={event.name} />}
              <div className="event-info">
                <h3>{event.name}</h3>
                <p>{event.concert_place}</p>
                <p>
                  {event.artistList.map((artist) => artist.name).join(" - ")}
                </p>
              </div>
              <div className="event-artist">
                <p>{event.hour}</p>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <li>Aucun évènement ne correspond à la date indiquée</li>
      )}
    </ul>
  );
}

export default EventSearchResult;
