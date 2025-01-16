import express from "express";
import category from "../controllers/categoryController";

// Initialisation du router Express
const router = express.Router();

/**
 * Route pour récupérer tout les ingrédients
 * Méthode : GET
 * Url: /api/categories
 * Description: Cette route appelle le controller ingredientController getAllingredient pour récupérer tout les ingrédientss de la BDD
 */
router.get("/categories", category.getAllCategories);

/**
 * Route pour récupérer tout les ingrédients par l'id d'une bière
 * Méthode : GET
 * Url: /api/categories/:id_category
 * Description: Cette route appelle le controller ingredientController getingredientById pour récupérer tout les ingrédients spécifique à une bière
 */
router.get("/categories/:id_category", category.getCategoryById);

/**
 * Route pour supprimmer un ingrédient
 * Méthode : DELETE
 * Url: /api/categories/:id_category
 * Description: Cette route appelle le controller ingredientController deletingredientById pour supprimmer un ingrédient
 */
router.delete("/categories/:id_category", category.deletCategoryById);

/**
 * Route pour créer un nouvelle ingrédients
 * Méthode : POST
 * Url: /api/categories
 * Body: {
    "type" : "test",
    "name" : "test" ,
    "description" : "test"
}
 * Description: Cette route appelle le controller ingredientController createingredient pour créer un nouvelle ingrédients
 */
router.post("/categories", category.createCategory);

/**
 * Route pour mettre à jour un ingrédient
 * Méthode : PATCH
 * Url: /api/categories/:id_category
 * Body: {
    "type" : "test",
    "name" : "test" ,
    
    "description" : "test"
}
 * Description: Cette route appelle le controller ingredientController upDateingredientById pour mettre à jour un ingrédient avec l'ID passer dans l'url
 */
router.patch("/categories/:id_category", category.upDateCategoryById);
export default router;
