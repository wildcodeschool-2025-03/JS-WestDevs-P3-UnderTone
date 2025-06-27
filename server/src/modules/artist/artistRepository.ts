import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class ArtistRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT a.user_id, a.name, a.description, a.demo, a.web_site, a.profile_picture, a.facebook_link, a.instagram_link, a.x_link, a.deezer_link, a.spotify_link, a.youtube_link, (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', ap.id, 'image', ap.image, 'date', ap.date)) FROM artist_photo AS ap WHERE a.user_id = ap.artist_id) AS artistPhotos, (SELECT JSON_ARRAYAGG(JSON_OBJECT('name', ms.name, 'id', ms.id)) FROM music_style AS ms JOIN artist_music_style AS ams ON ms.id = ams.music_style_id WHERE a.user_id = ams.artist_id) AS styles FROM artist AS a WHERE a.user_id = ?;",
      [id],
    );

    return rows[0] as Artist;
  }
}

export default new ArtistRepository();
