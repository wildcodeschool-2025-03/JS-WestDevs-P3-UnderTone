import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

class UserRepository {
  async findAll() {
    const [rows] = await databaseClient.query("SELECT * FROM user");
    return rows;
  }

  async findById(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE id = ?",
      [id],
    );
    return rows[0] || null;
  }

  async findByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return rows[0];
  }

  async create(body: Omit<SignIn, "confirmPassword">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (username, email, password, status, signup_date) VALUES (?, ?, ?, ?, DATE(NOW()))",
      [body.username, body.email, body.password, body.role],
    );

    return result.affectedRows;
  }

  async readById(userId: number, userStatus: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM ${userStatus} WHERE user_id = ?`,
      [userId],
    );

    return rows.length;
  }

  async update(
    id: number,
    profile_picture: string | null,
    birthdate: string | null,
  ) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET profile_picture = ?, birthdate = ? WHERE id = ?",
      [profile_picture, birthdate, id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new UserRepository();
