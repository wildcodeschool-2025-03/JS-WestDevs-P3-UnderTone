import type { RequestHandler } from "express";
import artistRepository from "./artistRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const artistId = Number(req.params.id);
    const artist = await artistRepository.read(artistId);

    if (artist == null) {
      res.status(404).json("L'artiste n'existe pas sur la plateforme.");
    } else {
      res.json(artist);
    }
  } catch (err) {
    next(err);
  }
};

export default { read };
