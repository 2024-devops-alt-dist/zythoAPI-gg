import express from "express";
import beers from "../controllers/beerController.js";

// Initialisation du router Express
const router = express.Router();

/**
 * Route pour récupérer toutes les bières
 * Méthode : GET
 * Url: /api/beers
 * Description: Cette route appelle le controller beerController getAllBeers pour récupérer toutes les bières de la BDD
 */
router.get("/beers", beers.getAllBeers);
/**
 * Route pour récupérer une bière
 * Méthode : GET
 * Url: /api/beers/:id_beer
 * Description: Cette route appelle le controller beerController getBeerById pour récupérer une bière spécifique avec sont ID
 */
router.get("/beers/:id_beer", beers.getBeerById);
/**
 * Route pour supprimmer une bière
 * Méthode : DELETE
 * Url: /api/beers/:id_beer
 * Description: Cette route appelle le controller beerController deletBeerById pour supprimmer une bière
 */
router.delete("/beers/:id_beer", beers.deletBeerById);
/**
 * Route pour créer une nouvelle bière
 * Méthode : POST
 * Url: /api/beers
 * Body: id_brewerie, id_category, id_picture, name, description, abv, color, price
 * Description: Cette route appelle le controller beerController createBeer pour créer une nouvelle bière
 */
router.post("/beers", beers.createBeer);
/**
 * Route pour mettre à jour une bière
 * Méthode : PATCH
 * Url: /api/beers/:id_beer
 * Body: id_picture, name, description, abv, color, price
 * Description: Cette route appelle le controller beerController upDateBeerById pour mettre à jour une bière avec l'ID passer dans l'url
 */
router.patch("/beers/:id_beer", beers.upDateBeerById);
export default router;
