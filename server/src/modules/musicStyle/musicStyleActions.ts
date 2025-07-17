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

export default { browse };
