import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class FavoriteEventRepository {
  async readByIds(targetId: number, userId: number, targetStatus: string) {
    const table = `favorite_${targetStatus}`;
    const column = `${targetStatus}_id`;

    const [rows] = await databaseClient.query<Rows>(
      `SELECT 1 FROM ${table} WHERE user_id = ? AND ${column} = ?`,
      [userId, targetId],
    );

    return rows.length > 0;
  }

  async readAllPastFavorites(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT f.event_id AS id, event.name, event.image, event.date, event.hour, cp.name AS concert_place, (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', a.user_id, 'name', a.name)) FROM artist AS a JOIN event_artist AS ea ON ea.artist_id = a.user_id WHERE ea.event_id = f.event_id AND ea.artist_presence = 1) AS artistList FROM favorite_event AS f JOIN event ON event.id = f.event_id JOIN concert_place AS cp ON event.concert_place_id = cp.user_id WHERE f.user_id = ? AND event.date < CURDATE();",
      [userId],
    );

    return rows as UserProfileFavoriteEvent[];
  }

  async readAllUpcommingFavorites(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT f.event_id AS id, event.name, event.image, event.date, event.hour, cp.name AS concert_place, (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', a.user_id, 'name', a.name)) FROM artist AS a JOIN event_artist AS ea ON ea.artist_id = a.user_id WHERE ea.event_id = f.event_id AND ea.artist_presence = 1) AS artistList FROM favorite_event AS f JOIN event ON event.id = f.event_id JOIN concert_place AS cp ON event.concert_place_id = cp.user_id WHERE f.user_id = ? AND event.date >= CURDATE();",
      [userId],
    );

    return rows as UserProfileFavoriteEvent[];
  }

  async create(userId: number, targetId: number, targetStatus: string) {
    const table = `favorite_${targetStatus}`;
    const column = `${targetStatus}_id`;

    const [result] = await databaseClient.query<Result>(
      `INSERT INTO ${table} (user_id, ${column}, date) VALUES (?, ?, CURDATE())`,
      [userId, targetId],
    );

    return result.affectedRows;
  }

  async delete(userId: number, targetId: number, targetStatus: string) {
    const table = `favorite_${targetStatus}`;
    const column = `${targetStatus}_id`;

    const [result] = await databaseClient.query<Result>(
      `DELETE FROM ${table} WHERE user_id = ? AND ${column} = ?`,
      [userId, targetId],
    );

    return result.affectedRows;
  }
}

export default new FavoriteEventRepository();
