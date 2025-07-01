import type { RequestHandler } from "express";
import signInRepository from "./signInRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const newUser = { username, email, password, role };

    const insertNewUser = await signInRepository.create(newUser);

    res.status(201).json("Votre compte a bien été créé");
  } catch (err) {
    next(err);
  }
};

export default { add };
