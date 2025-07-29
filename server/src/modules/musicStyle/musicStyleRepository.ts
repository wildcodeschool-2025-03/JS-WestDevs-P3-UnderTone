import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class MusicStyleRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, name AS label FROM music_style",
    );

    // Return the array of items
    return rows as MusicStyle[];
  }

  async createMusicStyle(name: string) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO music_style (name) VALUES (?);",
      [name],
    );

    return {
      id: result.insertId,
      label: name,
    };
  }

  async readByName(name: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM music_style WHERE name = ?",
      [name],
    );
    return rows[0];
  }
}
export default new MusicStyleRepository();
