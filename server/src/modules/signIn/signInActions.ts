import type { RequestHandler } from "express";
import signInRepository from "./signInRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, identifier } = req.body;

    if (req.body.password !== req.body.confirmPassword) {
      res
        .status(400)
        .json({ error: "Les mots de passe ne correspondent pas." });
      return;
    }

    const newUser = { username, email, password, identifier };

    const insertNewUser = await signInRepository.create(newUser);

    res.status(201).json("Votre compte a bien été créé");
  } catch (err) {
    next(err);
  }
};

export default { add };
