import type { RequestHandler } from "express";
import type { JwtPayload } from "jsonwebtoken";
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

const add: RequestHandler = async (req, res, next) => {
  try {
    const { userId, userStatus } = req.body.verifyToken as JwtPayload;

    if (userStatus === "concert_place") {
      let {
        name,
        description,
        address,
        web_site,
        socialNetworks,
        profile_picture,
        menu,
      } = req.body;
      socialNetworks = JSON.parse(socialNetworks);
      let facebook_link = "";
      let instagram_link = "";
      let x_link = "";

      socialNetworks.map(
        (sn: { name: string; value: string; link: string }) => {
          switch (sn.name) {
            case "Instagram":
              instagram_link = sn.link;
              break;
            case "Facebook":
              facebook_link = sn.link;
              break;
            case "X":
              x_link = sn.link;
              break;
          }
        },
      );

      const newConcertPlace = {
        name,
        description,
        address,
        web_site,
        profile_picture,
        menu,
        facebook_link,
        instagram_link,
        x_link,
      };

      const newConcertPlaceAffectedRows =
        await concertPlaceRepository.createConcertPlace(
          Number(userId),
          newConcertPlace,
        );

      if (!newConcertPlaceAffectedRows) {
        throw new Error("Echec de l'inscription des données.");
      }

      let { openingHours } = req.body;
      openingHours = JSON.parse(openingHours);

      const resultsOpeningHours = await Promise.all(
        openingHours.map(async (wd: SingleDayOpeningHours) => {
          const affectedRows = await concertPlaceRepository.createOpeningHours(
            Number(userId),
            wd,
          );
          return affectedRows;
        }),
      );

      const allOpeningHoursSuccessful = resultsOpeningHours.every(
        (affectedRows) => affectedRows === 1,
      );
      if (!allOpeningHoursSuccessful) {
        throw new Error(
          "Certaines heures d'ouverture n'ont pas pu être créées",
        );
      }

      const typeId = await concertPlaceRepository.readByType(req.body.type);
      const newConcertPlaceTypeSuccesful =
        await concertPlaceRepository.createConcertPlaceType(
          typeId,
          Number(userId),
        );

      if (!newConcertPlaceTypeSuccesful) {
        throw new Error("Echec de l'enregistrement du type.");
      }

      const { photos } = req.body;

      const resultPhotos = await Promise.all(
        photos.map(async (p: string) => {
          const affectedRows = await concertPlaceRepository.createPhoto(
            Number(userId),
            p,
          );
          return affectedRows;
        }),
      );

      const allPhotosSuccessful = resultPhotos.every(
        (affectedRows) => affectedRows === 1,
      );
      if (!allPhotosSuccessful) {
        throw new Error("Certaines photos n'ont pas pu être enregistrées");
      }

      res.status(201).json("Nouvelles données enregistrées ! 🔥");
    } else {
      res
        .status(403)
        .json("Your are not allowed to create a new concert-place.");
    }
  } catch (err) {
    console.error((err as Error).message);
  }
};

export default { read, add };
