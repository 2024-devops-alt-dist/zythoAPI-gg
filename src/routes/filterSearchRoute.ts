import express from "express";
import filterSearch from "../controllers/filterSearchController";
// Initialisation du router Express
const router = express.Router();

/**
 * Route pour récupérer une liste de bière spécifique avec un type
 * Méthode : POST
 * Url: /api/search
 * Body: {
    "id_type" : 7,
    "type": "category"
}
 * Description: Cette route appelle le controller findBeerByType getBeerByBrewerie pour récupérer une liste de bière spécifique avec un type
 */
router.post("/search", filterSearch.filterSearchController);

export default router;
