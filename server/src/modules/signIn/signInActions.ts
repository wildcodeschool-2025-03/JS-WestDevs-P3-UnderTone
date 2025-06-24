import type { RequestHandler } from "express";
import signInRepository from "./signInRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ error: "Les mots de passe ne correspondent pas." });
      return;
    }

    const newUser = { name, email, password };

    const insertNewUser = await signInRepository.create(newUser);

    res.status(201).json({ insertNewUser });
  } catch (err) {
    next(err);
  }
};

export default { add };
