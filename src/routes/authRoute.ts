import express from "express";
import auth from "../controllers/authController";

// Initialisation du router Express
const router = express.Router();

/**
 * Route inscription utilisateur
 * Méthode : POST
 * Url: /api/auth/register
 * Body: email, password
 * Description: Cette route appelle le controller authController
 */
router.post("/auth/register", auth.register);

export default router;
