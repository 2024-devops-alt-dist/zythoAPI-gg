import express from "express";
import ingredient from "../controllers/ingredientController";

// Initialisation du router Express
const router = express.Router();

/**
 * Route pour récupérer tout les ingrédients
 * Méthode : GET
 * Url: /api/ingredients
 * Description: Cette route appelle le controller ingredientController getAllingredient pour récupérer tout les ingrédientss de la BDD
 */
router.get("/ingredients", ingredient.getAllIngredient);

/**
 * Route pour récupérer tout les ingrédients par l'id d'une bière
 * Méthode : GET
 * Url: /api/ingredients/:id_ingredient
 * Description: Cette route appelle le controller ingredientController getingredientById pour récupérer tout les ingrédients spécifique à une bière
 */
router.get("/ingredients/:id_beer", ingredient.getIngredientByIdBeer);

/**
 * Route pour supprimmer un ingrédient
 * Méthode : DELETE
 * Url: /api/ingredients/:id_ingredient
 * Description: Cette route appelle le controller ingredientController deletingredientById pour supprimmer un ingrédient
 */
router.delete("/ingredients/:id_ingredient", ingredient.deletIngredientById);

/**
 * Route pour créer un nouvelle ingrédients
 * Méthode : POST
 * Url: /api/ingredients
 * Body: {
    "type" : "test",
    "name" : "test" ,
    "description" : "test"
}
 * Description: Cette route appelle le controller ingredientController createingredient pour créer un nouvelle ingrédients
 */
router.post("/ingredients", ingredient.createIngredient);

/**
 * Route pour mettre à jour un ingrédient
 * Méthode : PATCH
 * Url: /api/ingredients/:id_ingredient
 * Body: {
    "type" : "test",
    "name" : "test" ,
    "description" : "test"
}
 * Description: Cette route appelle le controller ingredientController upDateingredientById pour mettre à jour un ingrédient avec l'ID passer dans l'url
 */
router.patch("/ingredients/:id_ingredient", ingredient.upDateIngredientById);
export default router;
