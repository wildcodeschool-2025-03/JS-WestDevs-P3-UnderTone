import { useParams } from "react-router";
import "./Event.css";
import { useEffect, useState } from "react";

// Types TypeScript
interface MusicStyle {
  id: number;
  name: string;
}

interface InvitedArtist {
  id: number;
  name: string;
  musicStyles: MusicStyle[];
  profilePicture: string;
}

interface EventData {
  id: number;
  name: string;
  date_hour: string;
  description: string;
  image: string;
  invitedArtists: InvitedArtist[];
  concertPlaceName: string;
  address: string;
  menu: string;
}

function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState<null | EventData>(null);

  useEffect(() => {
    fetch(`http://localhost:3310/api/event/${id}`)
      .then((response) => response.json())
      .then((data: EventData) => setEvent(data));
  }, [id]);

  return (
    <main>
      {event && (
        <>
          <h1>{event.name}</h1>
          <img src={event.image} alt="affiche de la soirée" />
          <p>{event.date_hour}</p>
          {event.invitedArtists.map((artist) => (
            <div key={artist.id}>
              <p>{artist.name}</p>
              {artist.musicStyles.map((musicStyle) => (
                <div key={musicStyle.id}>
                  <p>{musicStyle.name}</p>
                </div>
              ))}
            </div>
          ))}
          <p>{event.concertPlaceName}</p>
          <p>{event.address}</p>
          <p>{event.description}</p>
        </>
      )}
    </main>
  );
}

export default Event;
