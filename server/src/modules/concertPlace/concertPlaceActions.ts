import type { RequestHandler } from "express";
import concertPlaceRepository from "./concertPlaceRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const concertPlaceId = Number(req.params.id);
    const concertPlace = await concertPlaceRepository.read(concertPlaceId);

    if (concertPlace == null) {
      res
        .status(404)
        .json("Ce lieu de concert n'existe pas sur la plateforme.");
    } else {
      res.json(concertPlace);
    }
  } catch (err) {
    next(err);
  }
};

export default { read };
