import express from "express";
import brewerie from "../controllers/brewerieController";

// Initialisation du router Express
const router = express.Router();

/**
 * Route pour récupérer toutes les brasseries
 * Méthode : GET
 * Url: /api/brewerie
 * Description: Cette route appelle le controller brewerieController getAllBrewerie pour récupérer toutes les brasseries de la BDD
 */
router.get("/brewerie", brewerie.getAllBrewerie);

/**
 * Route pour récupérer une brasserie
 * Méthode : GET
 * Url: /api/brewerie/:id_brewerie
 * Description: Cette route appelle le controller brewerieController getBrewerieById pour récupérer une brasserie spécifique avec sont ID
 */
router.get("/brewerie/:id_brewerie", brewerie.getBrewerieById);

/**
 * Route pour supprimmer une brasserie
 * Méthode : DELETE
 * Url: /api/brewerie/:id_brewerie
 * Description: Cette route appelle le controller brewerieController deletBrewerieById pour supprimmer une brasserie
 */
router.delete("/brewerie/:id_brewerie", brewerie.deletBrewerieById);

/**
 * Route pour créer une nouvelle brasserie
 * Méthode : POST
 * Url: /api/brewerie
 * Body: name, country
 * Description: Cette route appelle le controller brewerieController createBrewerie pour créer une nouvelle brasserie
 */
router.post("/brewerie", brewerie.createBrewerie);

/**
 * Route pour mettre à jour une brasserie
 * Méthode : PATCH
 * Url: /api/brewerie/:id_brewerie
 * Body: name, country
 * Description: Cette route appelle le controller brewerieController upDateBrewerieById pour mettre à jour une brasserie avec l'ID passer dans l'url
 */
router.patch("/brewerie/:id_brewerie", brewerie.upDateBrewerieById);
export default router;
