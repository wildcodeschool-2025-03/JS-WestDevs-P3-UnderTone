import type { RequestHandler } from "express";
import musicStyleRepository from "./musicStyleRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const musicStyles = await musicStyleRepository.readAll();
    res.status(200).json(musicStyles);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;
    const isRegistered = await musicStyleRepository.readByName(name);
    if (isRegistered) {
      res.status(400).json("Ce style existe déjà. Appuyer sur valider");
    }
    const musicStyle = await musicStyleRepository.createMusicStyle(name);

    res.status(201).json(musicStyle);
  } catch (err) {
    next(err);
  }
};

export default { browse, add };
