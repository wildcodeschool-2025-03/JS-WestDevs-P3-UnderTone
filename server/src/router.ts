import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import artistActions from "./modules/artist/artistActions";
router.get("/api/artist/:id", artistActions.read);

import artistStyleActions from "./modules/artistStyle/artistStyleActions";
router.get("/api/artist:id/styles", artistStyleActions.read);
/* ************************************************************************* */

export default router;
