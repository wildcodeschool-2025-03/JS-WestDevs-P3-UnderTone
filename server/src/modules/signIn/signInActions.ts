import type { RequestHandler } from "express";
import userRepository from "../user/userRepository";
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

const edit: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { profile_picture, signup_date } = req.body;

    const updateResult = await userRepository.update(
      Number(id),
      profile_picture,
      signup_date,
    );

    if (updateResult) {
      res.status(200).json("Votre compte a bien été mis à jour");
    } else {
      res.status(404).json("Utilisateur non trouvé");
    }
  } catch (error) {}
};
export default { add };
