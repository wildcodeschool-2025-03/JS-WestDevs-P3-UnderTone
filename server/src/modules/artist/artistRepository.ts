import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type ArtistToInsert = {
  user_id: number;
  name: string;
  description?: string;
  demo?: string;
  web_site?: string;
  profile_picture?: string;
  facebook_link?: string;
  instagram_link?: string;
  x_link?: string;
  deezer_link?: string;
  spotify_link?: string;
  youtube_link?: string;
};

class ArtistRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT a.user_id, a.name, a.description, a.demo, a.web_site, a.profile_picture,
              a.facebook_link, a.instagram_link, a.x_link, a.deezer_link, a.spotify_link, a.youtube_link,
              (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', ap.id, 'image', ap.image, 'date', ap.date))
               FROM artist_photo AS ap WHERE a.user_id = ap.artist_id) AS artistPhotos,
              (SELECT JSON_ARRAYAGG(JSON_OBJECT('name', ms.name, 'id', ms.id))
               FROM music_style AS ms
               JOIN artist_music_style AS ams ON ms.id = ams.music_style_id
               WHERE a.user_id = ams.artist_id) AS styles
        FROM artist AS a
        WHERE a.user_id = ?;`,
      [id],
    );

    return rows[0];
  }

  async create(artist: ArtistToInsert) {
    const [result] = await databaseClient.query(
      `INSERT INTO artist (user_id, name, description, demo, web_site, profile_picture, facebook_link, instagram_link, x_link, deezer_link, spotify_link, youtube_link)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        artist.user_id,
        artist.name,
        artist.description ?? null,
        artist.demo ?? null,
        artist.web_site ?? null,
        artist.profile_picture ?? null,
        artist.facebook_link ?? null,
        artist.instagram_link ?? null,
        artist.x_link ?? null,
        artist.deezer_link ?? null,
        artist.spotify_link ?? null,
        artist.youtube_link ?? null,
      ],
    );

    return {
      id: artist.user_id,
      name: artist.name,
    };
  }
}

export default new ArtistRepository();
