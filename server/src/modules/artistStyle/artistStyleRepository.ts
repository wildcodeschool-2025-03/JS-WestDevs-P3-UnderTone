import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class ArtistRepository {
  async readAll(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT ms.id, ms.name FROM artist_music_style AS ams JOIN music_style AS ms ON ams.music_style_id=ms.id WHERE ams.artist_id=?",
      [id],
    );

    return rows as MusicStyle[];
  }
}

export default new ArtistRepository();
