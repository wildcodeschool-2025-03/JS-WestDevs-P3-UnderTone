import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class EventRepository {
  async createEvent(
    name: string,
    date: string,
    hour: string,
    event_picture: string,
    description: string,
    concert_place_id: number,
  ) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO event (name, date, hour, image, description, concert_place_id) VALUES (?, ?, ?, ?, ?, ?);",
      [name, date, hour, event_picture, description, concert_place_id],
    );

    return result.insertId;
  }

  async createEventArtistLink(event_id: number, artist_id: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO event_artist (event_id, artist_id) VALUES (?, ?);",
      [event_id, artist_id],
    );

    return result.affectedRows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT e.id, e.name, e.date, e.hour, e.description, e.image, (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', a.user_id, 'name', a.name, 'profilePicture', a.profile_picture, 'musicStyles', COALESCE((SELECT JSON_ARRAYAGG(JSON_OBJECT('id', ms.id, 'name', ms.name)) FROM artist_music_style AS ams JOIN music_style AS ms ON ms.id = ams.music_style_id WHERE a.user_id = ams.artist_id), JSON_ARRAY()))) FROM event_artist AS ea JOIN artist AS a ON ea.artist_id = a.user_id WHERE e.id = ea.event_id) AS invitedArtists, cp.name AS concertPlaceName, cp.address, cp.menu FROM event AS e JOIN concert_place AS cp ON e.concert_place_id = cp.user_id WHERE e.id = ?;",
      [id],
    );

    return rows[0] as EventType;
  }
}

export default new EventRepository();
