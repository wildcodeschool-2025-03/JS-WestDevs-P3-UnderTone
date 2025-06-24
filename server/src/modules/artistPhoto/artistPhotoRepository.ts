import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ArtistPhotoRepository {
  async readAll(artist_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, image AS imgSrc, date FROM artist_photo WHERE artist_id=?",
      [artist_id],
    );

    return rows as Photo[];
  }
}

export default new ArtistPhotoRepository();
