import type { RequestHandler } from "express";
import eventRepository from "./eventRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    const event = await eventRepository.read(eventId);

    if (event == null) {
      res.status(404).json("L'évènement n'existe pas.");
      return;
    }

    res.json(event);
  } catch (err) {
    next(err);
  }
};

const search: RequestHandler = async (req, res, next) => {
  try {
    const { town, date } = req.query;

    if (!town || !date) {
      res
        .status(400)
        .json({ error: "Les champs 'ville' et 'date' sont requis." });
      return;
    }

    const result = await eventRepository.search(town as string, date as string);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default { read, search };
