import express from "express";
import artistActions from "./modules/artist/artistActions";
import userActions from "./modules/user/userActions";
import auth from "./utils/auth";
import validation from "./utils/validation";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

router.post(
  "/register",
  validation.userValidation,
  auth.hashPassword,
  userActions.add,
);
router.post("/login", validation.userValidation, auth.login);
router.get(
  "/created-user",
  auth.verifyRequesterId,
  userActions.readDataPresence,
);
router.get("/user/profile", auth.verifyRequesterId, userActions.readProfile);
router.patch(
  "/complete/user/:id",
  files.uploadUserProfilePicture,
  files.userProfilePicture,
  auth.verifyRequesterId,
  userActions.edit,
);
router.get("/refresh", auth.refreshToken);
router.get("/logout", auth.logout);

import files from "./utils/files";

router.get("/artist/:id", artistActions.read);
router.get("/search/artist", artistActions.artistSearch);
router.get("/music-styles", musicStyleActions.browse);
router.get("/artist", artistActions.browse);
router.post("/music-styles", musicStyleActions.add);

router.post(
  "/new/artist",
  files.uploadArtistFiles,
  files.artistFiles,
  auth.verifyRequesterId,
  artistActions.add,
);

import concertPlaceActions from "./modules/concertPlace/concertPlaceActions";

router.get("/concert-place/:id", concertPlaceActions.read);
router.post(
  "/new/concert-place",
  files.uploadConcertPlaceFiles,
  files.concertPlaceFiles,
  auth.verifyRequesterId,
  concertPlaceActions.add,
);

import eventActions from "./modules/event/eventActions";
import musicStyleActions from "./modules/musicStyle/musicStyleActions";

router.get("/event/:id", eventActions.read);
router.get("/search/event", eventActions.eventSearch);
router.post(
  "/new/event",
  files.uploadEventFile,
  files.eventFile,
  auth.verifyRequesterId,
  eventActions.add,
);

import favoriteActions from "./modules/favorite/favoriteActions";
import favoriteEventActions from "./modules/favoriteEvent/favoriteEventActions";

router.get(
  "/favorites/:targetId/:targetStatus",
  auth.verifyRequesterId,
  favoriteActions.readFavorite,
);
router.get(
  "/favoritesByType/:targetStatus",
  auth.verifyRequesterId,
  favoriteActions.browseTypedFavorites,
);
router.get(
  "/favorites-past-events",
  auth.verifyRequesterId,
  favoriteEventActions.browseFavoritesPastEvents,
);
router.get(
  "/favorites-upcomming-events",
  auth.verifyRequesterId,
  favoriteEventActions.browseFavoritesUpcommingEvents,
);
router.post(
  "/favorites/:targetId/:targetStatus",
  auth.verifyRequesterId,
  favoriteActions.addFavorite,
);
router.delete(
  "/favorites/:targetId/:targetStatus",
  auth.verifyRequesterId,
  favoriteActions.deleteFavorite,
);

/* ************************************************************************* */

export default router;
