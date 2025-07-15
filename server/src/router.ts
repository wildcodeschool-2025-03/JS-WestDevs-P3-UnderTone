import express from "express";
import multer from "multer";
import artistActions from "./modules/artist/artistActions";
import itemActions from "./modules/item/itemActions";
import auth from "./utils/auth";
import validation from "./utils/validation";

const router = express.Router();

const upload = multer();

/* ************************************************************************* */
// Define Your API Routes Here
import signInActions from "./modules/signIn/signInActions";
router.post(
  "/register",
  validation.userValidation,
  auth.hashPassword,
  signInActions.add,
);

router.get("/items", itemActions.browse);
router.get("/items/:id", itemActions.read);
router.post("/items", itemActions.add);

router.get("/artist/:id", artistActions.read);

import concertPlaceActions from "./modules/concertPlace/concertPlaceActions";
import * as files from "./utils/files";

router.get("/concert-place/:id", concertPlaceActions.read);
router.post(
  "/new/concert-place",
  files.uploadConcertPlaceFiles,
  files.concertPlaceFiles,
  auth.verifyRequesterId,
  concertPlaceActions.add,
);

import eventActions from "./modules/event/eventActions";

router.get("/event/:id", eventActions.read);
router.get("/event/search");

router.post("/login", validation.userValidation, auth.login);

/* ************************************************************************* */

export default router;
