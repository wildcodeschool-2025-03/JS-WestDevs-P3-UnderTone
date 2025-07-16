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

const create: RequestHandler = async (req, res, next) => {
  try {
    const artist = req.body;
    console.warn(req.body);
    console.warn(req.files);

    if (!artist.user_id || !artist.name) {
      res.status(400).json("Champs obligatoires manquants (user_id ou name)");
      return;
    }

    const insertedArtist = await artistRepository.create(artist);
    res.status(201).json(insertedArtist);
  } catch (err) {
    next(err);
  }
};

export default { read, create };
