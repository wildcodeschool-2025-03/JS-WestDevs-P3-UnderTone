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

const add: RequestHandler = async (req, res, next) => {
  try {
    const concert_place_id = Number(req.body.verifyToken.userId);
    const { name, date, hour, event_picture, description } = req.body;

    const eventId = await eventRepository.createEvent(
      name,
      date,
      hour,
      event_picture,
      description,
      concert_place_id,
    );

    if (!eventId) {
      throw new Error("Echec de la création d'évènement ❌");
    }

    let { artistsToInvite } = req.body;
    artistsToInvite = JSON.parse(artistsToInvite);

    const resultsInvitedArtists = await Promise.all(
      artistsToInvite.map(async (artist: { id: number; label: string }) => {
        const affectedRows = await eventRepository.createEventArtistLink(
          eventId,
          artist.id,
        );
        return affectedRows;
      }),
    );

    const allInvitedArtistSuccessful = resultsInvitedArtists.every(
      (affectedRows) => affectedRows === 1,
    );
    if (!allInvitedArtistSuccessful) {
      throw new Error(
        "Certains artistes n'ont pas pu être enregistrés sur l'évènement ❌",
      );
    }

    res.status(201).json("Nouvelles données enregistrées ! 🔥");
  } catch (err) {
    next(err);
  }
};

export default { read, add };
