import express from "express";
import getAllBeers from "../controllers/beerController.js";

// Initialisation du router Express
const router = express.Router();

/**
 * Route pour récupérer toutes les bières
 * Méthode : GET
 * Url: /api/beers
 * Description: Cette route appelle le controller beerController getAllBeers
 */
router.get("/beers", getAllBeers);
export default router;
