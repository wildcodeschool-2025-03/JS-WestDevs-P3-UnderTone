import type { RequestHandler } from "express";
import type { JwtPayload } from "jsonwebtoken";
import userRepository from "./userRepository";

const readDataPresence: RequestHandler = async (req, res, next) => {
  try {
    const { userId, userStatus } = req.body.verifyToken as JwtPayload;
    console.log(userStatus);

    const searchedStatus = ["artist", "concert_place"];

    if (!searchedStatus.includes(userStatus)) {
      res.status(401).json({ redirection: "/app/research" });
      return;
    }

    const isSomeDataRegistered = await userRepository.readById(
      Number(userId),
      userStatus,
    );

    if (!isSomeDataRegistered) {
      res.status(200).json({
        result: "Some data already exist",
        redirection: `/app/new/${userStatus === "artist" ? "artist" : "concert-place"}`,
      });
    } else {
      res
        .status(200)
        .json({ result: "No data registered", redirection: "/app/research" });
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { profile_picture, birthdate } = req.body;
    const { userId } = req.body.verifyToken as JwtPayload;

    if (Number(userId) !== Number(id)) {
      throw new Error("Vous n'êtes pas autorisé à modifier ce compte.");
    }

    const updateResult = await userRepository.update(
      Number(userId),
      profile_picture,
      birthdate,
    );

    if (updateResult) {
      res.status(200).json("Votre compte a bien été mis à jour 🔥");
    } else {
      res.status(400).json("Echec de la mise à jour des données");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const isEmailAviable = await userRepository.findByEmail(email);
    if (isEmailAviable) {
      throw new Error("Cet Email est déjà enregistré.");
    }

    const newUser = { username, email, password, role };

    const insertNewUser = await userRepository.create(newUser);

    if (insertNewUser) {
      res.status(201).json("Votre compte a bien été créé");
    }
  } catch (err) {
    next(err);
  }
};

export default { readDataPresence, edit, add };
