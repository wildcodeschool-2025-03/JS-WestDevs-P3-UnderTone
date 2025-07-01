import type { RequestHandler } from "express";

const userValidation: RequestHandler = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isEmailValid = email.match(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm);
    const isPasswordValid = password.match(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
    );
    if (!email || !password) {
      res.status(403).json("Les champs ne peuvent être vides");
    } else if (!isEmailValid) {
      res.status(403).json("Le format d'email est invalide");
    } else if (!isPasswordValid) {
      res
        .status(403)
        .json(
          "Le mot de passe doit contenir entre 8 et 16 caractères, inclure des majuscules, des minuscules, des chiffres et des caractères spéciaux, sans espaces",
        );
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export default { userValidation };
