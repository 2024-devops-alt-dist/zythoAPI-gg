import express from "express";
import beers from "../controllers/beerController.js";

// Initialisation du router Express
const router = express.Router();

/**
 * Route pour récupérer toutes les bières
 * Méthode : GET
 * Url: /api/beers
 * Description: Cette route appelle le controller beerController getAllBeers
 */
router.get("/beers", beers.getAllBeers);
/**
 * Route pour récupérer une bière
 * Méthode : GET
 * Url: /api/beers/:id_beer
 * Description: Cette route appelle le controller beerController getBeerById
 */
router.get("/beers/:id_beer", beers.getBeerById);
export default router;
