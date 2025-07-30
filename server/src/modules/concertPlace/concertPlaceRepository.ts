import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class ConcertPlaceRepository {
  async createConcertPlace(id: number, ncp: NewConcertPlace) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO concert_place (user_id, name, description, web_site, profile_picture, address, menu, facebook_link, instagram_link, x_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        ncp.name,
        ncp.description,
        ncp.web_site,
        ncp.profile_picture,
        ncp.address,
        ncp.menu,
        ncp.facebook_link,
        ncp.instagram_link,
        ncp.x_link,
      ],
    );

    return result.affectedRows;
  }

  async createOpeningHours(id: number, wd: SingleDayOpeningHours) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO opening_hour (concert_place_id, week_day, openingHourNoon, closingHourNoon, openingHourEvening, closingHourEvening) VALUES (?, ?, ?, ?, ?, ?)",
      [
        id,
        wd.weekDay,
        wd.openingHourNoon,
        wd.closingHourNoon,
        wd.openingHourEvening,
        wd.closingHourEvening,
      ],
    );

    return result.affectedRows;
  }

  async createConcertPlaceType(typeId: number, userId: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO concert_place_type (concert_place_id, type_id) VALUES (?, ?)",
      [userId, typeId],
    );

    return result.affectedRows;
  }

  async createPhoto(concert_place_id: number, imgSrc: string) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO concert_place_photo (image, date, concert_place_id) VALUES (?, NOW(), ?)",
      [imgSrc, concert_place_id],
    );

    return result.affectedRows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT cp.user_id, cp.name, cp.description, cp.web_site, cp.profile_picture, cp.facebook_link, cp.instagram_link, cp.x_link, cp.menu, cp.address, (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', cpp.id, 'image', cpp.image, 'date', cpp.date)) FROM concert_place_photo AS cpp WHERE cp.user_id = cpp.concert_place_id) AS concertPlacePhotos, (SELECT JSON_ARRAYAGG(JSON_OBJECT('name', t.name, 'id', t.id)) FROM type AS t JOIN concert_place_type AS cpt ON t.id = cpt.type_id WHERE cp.user_id = cpt.concert_place_id) AS types, (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', cpoh.id, 'weekDay', cpoh.week_day, 'openingHourNoon', cpoh.opening_hour_noon, 'closingHourNoon', cpoh.closing_hour_noon, 'openingHourEvening', cpoh.opening_hour_evening, 'closingHourEvening', cpoh.closing_hour_evening)) FROM opening_hour AS cpoh WHERE cp.user_id = cpoh.concert_place_id) AS openingHours FROM concert_place AS cp WHERE cp.user_id = ?;`,
      [id],
    );

    return rows[0] as ConcertPlace;
  }

  async readByType(type: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id FROM type WHERE name = ?",
      [type],
    );
    const { id } = rows[0] as { id: number };
    return id;
  }
  async locationSearch(name: string | null, type: string | null) {
    const conditions: string[] = [];
    const values: string[] = [];
    if (name) {
      conditions.push("LOWER(cp.name) LIKE LOWER (?)");
      values.push(`%${name}%`);
    }
    if (type) {
      conditions.push("LOWER(t.name) = LOWER(?)");
      values.push(type);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const [rows] = await databaseClient.query<Rows>(
      `SELECT cp.user_id AS id, cp.name, cp.address, cp.profile_picture, JSON_ARRAYAGG(JSON_OBJECT('weekDay', oh.week_day, "openingHourNoon", oh.opening_hour_noon, "closingHourNoon", oh.closing_hour_noon, "openingHourEvening", oh.opening_hour_evening, "closingHourEvening", oh.closing_hour_evening)) AS openingHours FROM concert_place cp JOIN opening_hour AS oh ON cp.user_id = oh.concert_place_id JOIN concert_place_type AS cpt ON cpt.concert_place_id = cp.user_id JOIN type AS t ON t.id = cpt.type_id ${where} GROUP BY cp.user_id, cp.name, cp.address, cp.profile_picture;`,
      values,
    );

    return rows;
  }
}

export default new ConcertPlaceRepository();
