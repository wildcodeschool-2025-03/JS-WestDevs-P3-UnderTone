import express from "express";
import artistActions from "./modules/artist/artistActions";
import itemActions from "./modules/item/itemActions";
import auth from "./utils/auth";
import validation from "./utils/validation";

const router = express.Router();

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

router.get("/concert-place/:id", concertPlaceActions.read);

import eventAction from "./modules/event/eventActions";

router.get("/event/:id", eventAction.read);

router.post("/login", validation.userValidation, auth.login);

/* ************************************************************************* */

export default router;
