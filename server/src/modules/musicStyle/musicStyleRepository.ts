import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class MusicStyleRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name AS label FROM music_style",
    );

    // Return the array of items
    return rows as MusicStyle[];
  }
}

export default new MusicStyleRepository();
