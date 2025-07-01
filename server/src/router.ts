import express from "express";
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
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/items", itemActions.browse);
router.get("/items/:id", itemActions.read);
router.post("/items", itemActions.add);

import artistActions from "./modules/artist/artistActions";

router.get("/artist/:id", artistActions.read);
/* ************************************************************************* */

export default router;
