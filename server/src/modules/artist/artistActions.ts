import type { RequestHandler } from "express";
import type { JwtPayload } from "jsonwebtoken";
import artistRepository from "./artistRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const artistNameList = await artistRepository.realAllNamesAsLabels();

    if (!artistNameList.length) {
      throw new Error("Erreur de lecture de la base de données ❌");
    }

    res.status(200).json(artistNameList);
  } catch (err) {
    next(err);
  }
};

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

const artistSearch: RequestHandler = async (req, res, next) => {
  try {
    const artistName = req.query.name ? String(req.query.name) : null;
    const artistStyle = req.query.musicStyle
      ? String(req.query.musicStyle)
      : null;

    const result = await artistRepository.artistSearch(artistName, artistStyle);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const { userId, userStatus } = req.body.verifyToken as JwtPayload;

    if (userStatus === "artist") {
      if (!req.body.name) {
        res.status(400).json("Champ obligatoire manquant (Nom d'artiste)");
        return;
      }

      const artist = req.body;
      let {
        name,
        description,
        demo,
        web_site,
        profile_picture,
        socialNetworks,
      } = artist;

      socialNetworks = JSON.parse(socialNetworks);
      let facebook_link = "";
      let instagram_link = "";
      let x_link = "";
      let spotify_link = "";
      let deezer_link = "";
      let youtube_link = "";

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
            case "Spotify":
              spotify_link = sn.link;
              break;
            case "Deezer":
              deezer_link = sn.link;
              break;
            case "YouTube":
              youtube_link = sn.link;
              break;
          }
        },
      );

      const newArtist = {
        name,
        description,
        demo,
        web_site,
        profile_picture,
        facebook_link,
        instagram_link,
        x_link,
        spotify_link,
        deezer_link,
        youtube_link,
      };

      const newArtistAffectedRows = await artistRepository.createArtist(
        Number(userId),
        newArtist,
      );

      if (!newArtistAffectedRows) {
        throw new Error("Echec de l'inscription des données.");
      }

      let { selectedStyles } = artist;
      selectedStyles = JSON.parse(selectedStyles);

      const resultStyles = await Promise.all(
        selectedStyles.map(async (ss: SelectedStyle) => {
          const affectedRows = await artistRepository.createArtistStyle(
            Number(userId),
            ss,
          );
          return affectedRows;
        }),
      );

      const allStylesSuccessful = resultStyles.every(
        (affectedRows) => affectedRows === 1,
      );
      if (!allStylesSuccessful) {
        throw new Error("Certains styles n'ont pas pu être enregistrés");
      }

      const { photos } = artist;

      const resultPhotos = await Promise.all(
        photos.map(async (p: string) => {
          const affectedRows = await artistRepository.createPhoto(
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
        .json(
          "Vous n'avez pas les permissions pour enregistrer un nouvel artiste.",
        );
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, artistSearch, add };
