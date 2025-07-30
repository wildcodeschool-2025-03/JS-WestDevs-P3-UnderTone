import { Link, useParams } from "react-router";
import "./Event.css";
import { useEffect, useState } from "react";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import { useAuth } from "../../services/AuthContext";
function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState<null | EventData>(null);

  useEffect(() => {
    fetch(`http://localhost:3310/api/event/${id}`)
      .then((response) => response.json())
      .then((data: EventData) => {
        data.date = new Date(data.date);
        setEvent(data);
      });
  }, [id]);
  const { isLogged } = useAuth();
  return (
    <main className="event-container">
      {event && (
        <>
          <section>
            <h1>{event.name}</h1>
            <p>
              {event.date.toLocaleDateString()} à {event.hour}
            </p>
            <h2>Artistes invités</h2>
            <ul className="event-artists">
              {event.invitedArtists.map((artist) => (
                <li key={artist.id}>
                  <Link to={`/app/artist/${artist.id}`}>
                    <img
                      src={artist.profilePicture}
                      alt={`portrait de ${artist.name}`}
                    />
                    <div className="artist-info">
                      <h3>{artist.name}</h3>
                      <p>
                        {artist.musicStyles.map((musicStyle) => (
                          <li key={musicStyle.id}>{musicStyle.name}</li>
                        ))}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>{" "}
            <iframe
              src={`${event.menu}#toolbar=0`}
              title="menu"
              width={700}
              height={500}
            />
          </section>
          <section>
            <div className="event-image">
              {isLogged && <FavoriteButton />}
              <img src={event.image} alt="affiche de la soirée" />
            </div>
            <div className="event-place">
              <Link to={`/app/concert-place/${event.concertPlaceId}`}>
                {event.concertPlaceName}
              </Link>

              <p>{event.address}</p>
              <p>{event.description}</p>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Event;
