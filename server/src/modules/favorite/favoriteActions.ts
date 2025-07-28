import type { RequestHandler } from "express";
import favoriteRepository from "./favoriteRepository";

const browseTypedFavorites: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.body.verifyToken;
    const { targetStatus } = req.params;
    const valid = ["artist", "concert_place"];

    if (!valid.includes(targetStatus)) {
      res.status(400).json({ error: "Target type invalide" });
      return;
    }

    const favorites = await favoriteRepository.readByType(
      Number(userId),
      valid.filter((str) => str.includes(targetStatus))[0],
    );

    if (!favorites.length) {
      throw new Error("Aucun favoris enregistré ❌");
    }

    res.status(200).json(favorites);
  } catch (err) {
    next(err);
  }
};

const readFavorite: RequestHandler = async (req, res) => {
  try {
    const { targetId, targetStatus } = req.params;

    const valid = ["artist", "concert_place"];
    const { userId } = req.body.verifyToken;

    if (!valid.includes(targetStatus)) {
      res.status(400).json({ error: "Target type invalide" });
      return;
    }
    const isFavorite = await favoriteRepository.readByIds(
      Number(targetId),
      Number(userId),
      valid.filter((str) => str.includes(targetStatus))[0],
    );

    if (!isFavorite) {
      res.sendStatus(400);
      return;
    }
    res.sendStatus(200);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const addFavorite: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body.verifyToken;
    const { targetId, targetStatus } = req.params;
    const valid = ["artist", "concert_place"];

    if (!valid.includes(targetStatus)) {
      res.status(400).json({ error: "Target type invalide" });
      return;
    }

    const newFavorite = await favoriteRepository.create(
      Number(userId),
      Number(targetId),
      valid.filter((str) => str.includes(targetStatus))[0],
    );

    if (!newFavorite) {
      res.status(400).json("Echec de l'inscription en base de données");
      return;
    }

    res.status(201).json({ message: "Ajouté aux favoris" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const deleteFavorite: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body.verifyToken;
    const { targetId, targetStatus } = req.params;
    const valid = ["artist", "concert_place"];

    if (!valid.includes(targetStatus)) {
      res.status(400).json({ error: "Target type invalide" });
      return;
    }

    const deletedFavorite = await favoriteRepository.delete(
      Number(userId),
      Number(targetId),
      valid.filter((str) => str.includes(targetStatus))[0],
    );

    if (!deletedFavorite) {
      res.status(400).json("Le favoris n'a pas été effacé");
      return;
    }

    res.status(201).json({ message: "Ajouté aux favoris" });
  } catch {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export default {
  browseTypedFavorites,
  readFavorite,
  addFavorite,
  deleteFavorite,
};
