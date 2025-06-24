import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type SignIn = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

class SignInRepository {
  async create(data: Omit<SignIn, "confirmPassword">) {
    const [result] = await databaseClient.query<Result>(
      "insert into user (name, email, password) values (?, ?, ?)",
      [data.name, data.email, data.password],
    );

    return result.affectedRows;
  }
}

export default new SignInRepository();
