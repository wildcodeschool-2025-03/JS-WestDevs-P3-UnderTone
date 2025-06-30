import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
import signInActions from "./modules/signIn/signInActions";
router.post("/register", signInActions.add);
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/items", itemActions.browse);
router.get("/items/:id", itemActions.read);
router.post("/items", itemActions.add);

import artistActions from "./modules/artist/artistActions";
router.get("/artist/:id", artistActions.read);

import concertPlaceActions from "./modules/concertPlace/concertPlaceActions";
router.get("/concert-place/:id", concertPlaceActions.read);
/* ************************************************************************* */

export default router;
