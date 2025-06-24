import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class ArtistRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM artist WHERE user_id= ?",
      [id],
    );

    return rows[0] as Artist;
  }
}

export default new ArtistRepository();
