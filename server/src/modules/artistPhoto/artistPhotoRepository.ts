import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Photo = {
  id: number;
  imgSrc: string;
  date: string;
};

class ArtistPhotoRepository {
  async readAll(artist_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, image AS imgSrc, date FROM artist_photo WHERE artist_id=?",
      [artist_id],
    );

    // Return the array of items
    return rows as Photo[];
  }
}

export default new ArtistPhotoRepository();
