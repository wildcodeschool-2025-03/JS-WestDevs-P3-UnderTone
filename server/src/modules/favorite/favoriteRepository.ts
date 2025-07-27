import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class FavoriteRepository {
  async readByIds(targetId: number, userId: number, targetStatus: string) {
    const table = `favorite_${targetStatus}`;
    const column = `${targetStatus}_id`;

    const [rows] = await databaseClient.query<Rows>(
      `SELECT 1 FROM ${table} WHERE user_id = ? AND ${column} = ?`,
      [userId, targetId],
    );

    return rows.length > 0;
  }

  async readByType(userId: number, type: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT f.${type}_id AS id, ${type}.name, ${type}.profile_picture FROM favorite_${type} AS f JOIN ${type} ON ${type}.user_id = f.${type}_id WHERE f.user_id = ?`,
      [userId],
    );

    return rows as FavoritesByType;
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

export default new FavoriteRepository();
