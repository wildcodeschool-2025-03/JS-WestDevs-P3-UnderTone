import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class EventRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT e.id, e.name, e.date_hour, e.description, e.image, (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', a.user_id, 'name', a.name, 'profilePicture', a.profile_picture, 'musicStyles', (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', ms.id, 'name', ms.name)) FROM artist_music_style AS ams JOIN music_style AS ms ON ms.id = ams.music_style_id WHERE a.user_id = ams.artist_id))) FROM event_validation AS ev JOIN artist AS a ON ev.artist_id = a.user_id WHERE e.id = ev.event_id) AS invitedArtists, cp.name AS concertPlaceName, cp.address, cp.menu FROM event AS e JOIN concert_place AS cp ON e.concert_place_id = cp.user_id WHERE e.id = ?;",
      [id],
    );

    return rows[0] as Event;
  }
}

export default new EventRepository();
