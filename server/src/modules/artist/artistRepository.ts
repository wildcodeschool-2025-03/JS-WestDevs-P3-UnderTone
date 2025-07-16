import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class ArtistRepository {
  async createArtist(id: number, artist: ArtistToInsert) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO artist (user_id, name, description, demo, web_site, profile_picture, facebook_link, instagram_link, x_link, deezer_link, spotify_link, youtube_link)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
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

    return result.affectedRows;
  }

  async createPhoto(artist_id: number, imgSrc: string) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO artist_photo (image, date, artist_id) VALUES (?, NOW(), ?)",
      [imgSrc, artist_id],
    );

    return result.affectedRows;
  }

  async createArtistStyle(artist_id: number, selectedStyle: SelectedStyle) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO artist_music_style (artist_id, music_style_id) VALUES (?, ?)",
      [artist_id, selectedStyle.id],
    );

    return result.affectedRows;
  }

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
}

export default new ArtistRepository();
