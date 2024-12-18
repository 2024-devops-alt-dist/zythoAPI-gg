import express from "express";
import ingredientController from "../controllers/ingredientController";

// Initialisation du router Express
const router = express.Router();

/**
 * Route pour récupérer tout les ingrédients
 * Méthode : GET
 * Url: /api/ingredients
 * Description: Cette route appelle le controller ingredientController getAllIngredient pour récupérer tout les ingrédients de la BDD
 */
router.get("/ingredients", ingredientController.getAllIngredient);

/**
 * Route pour récupérer un ingrédient
 * Méthode : GET
 * Url: /api/ingredients/:id_ingredient
 * Description: Cette route appelle le controller ingredientController getIngredientById pour récupérer un ingrédient spécifique avec sont ID
 */
router.get(
  "/ingredients/:id_ingredient",
  ingredientController.getIngredientById
);

/**
 * Route pour supprimmer un ingrédient
 * Méthode : DELETE
 * Url: /api/ingredients/:id_ingredient
 * Description: Cette route appelle le controller ingredientController deleteIngredientById pour supprimmer un ingrédient
 */
router.delete(
  "/ingredients/:id_ingredient",
  ingredientController.deleteIngredientById
);

/**
 * Route pour créer une nouvell ingrédient
 * Méthode : POST
 * Url: /api/ingredients
 * Body: name, country
 * Description: Cette route appelle le controller ingredientController createIngredient pour créer une nouvell ingrédient
 */
router.post("/ingredients", ingredientController.createIngredient);

/**
 * Route pour mettre à jour un ingrédient
 * Méthode : PATCH
 * Url: /api/ingredients/:id_ingredient
 * Body: name, country
 * Description: Cette route appelle le controller ingredientController upDateIngredientById pour mettre à jour un ingrédient avec l'ID passer dans l'url
 */
router.patch(
  "/ingredients/:id_ingredient",
  ingredientController.upDateIngredientById
);
export default router;
