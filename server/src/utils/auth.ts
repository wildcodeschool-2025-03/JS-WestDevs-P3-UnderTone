import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../modules/user/userRepository";

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hash = await argon2.hash(password, {
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    });
    req.body.password = hash;

    next();
  } catch (err) {
    res.sendStatus(500);
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const user = await userRepository.findByEmail(req.body.email);

    if (!user) throw new Error("USER_NOT_FOUND");

    const validPassword = await argon2.verify(user.password, req.body.password);
    if (!validPassword) throw new Error("INVALID_PASSWORD");
    const secretKey = process.env.APP_SECRET;

    if (!secretKey) {
      throw new Error("A secret must be provided");
    }
    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    const { id, status, username } = user;

    res.status(200).json({
      infos: "Connection success",
      result: { id, status, username },
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

export default { hashPassword, login };
