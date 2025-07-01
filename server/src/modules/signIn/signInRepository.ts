import databaseClient from "../../../database/client";

import type { Result } from "../../../database/client";

class SignInRepository {
  async create(body: Omit<SignIn, "confirmPassword">) {
    console.log(body);
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (username, email, password, status, signup_date) VALUES (?, ?, ?, ?, DATE(NOW()))",
      [body.username, body.email, body.password, body.role],
    );

    return result.affectedRows;
  }
}

export default new SignInRepository();
