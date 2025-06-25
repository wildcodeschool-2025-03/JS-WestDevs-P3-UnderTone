import type { RequestHandler } from "express";

import artistStyleRepository from "./artistStyleRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const artistId = Number(req.params.id);
    const artistStyles = await artistStyleRepository.readAll(artistId);

    if (artistStyles == null) {
      res.status(404).json("L'artiste n'a pas défini son style.");
    } else {
      res.json(artistStyles);
    }
  } catch (err) {
    next(err);
  }
};

export default { read };
