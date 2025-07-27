import type { RequestHandler } from "express";
import favoriteEventRepository from "./favoriteEventRepository";

const browseFavoritesPastEvents: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.body.verifyToken;

    const favorites = await favoriteEventRepository.readAllPastFavorites(
      Number(userId),
    );

    if (!favorites.length) {
      res.status(204).json("Aucun favoris enregistré ❌");
    }

    res.status(200).json(favorites);
  } catch (err) {
    next(err);
  }
};

const browseFavoritesUpcommingEvents: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { userId } = req.body.verifyToken;

    const favorites = await favoriteEventRepository.readAllUpcommingFavorites(
      Number(userId),
    );

    if (!favorites.length) {
      res.status(204).json("Aucun favoris enregistré ❌");
    }

    res.status(200).json(favorites);
  } catch (err) {
    next(err);
  }
};

export default {
  browseFavoritesPastEvents,
  browseFavoritesUpcommingEvents,
};
