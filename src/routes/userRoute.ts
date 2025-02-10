import express from "express";
import user from "../controllers/userController";

// Initialisation du router Express
const router = express.Router();

/**
 * Route pour récupérer tout les utilisateurs
 * Méthode : GET
 * Url: /api/users
 * Description: Cette route appelle le controller ingredientController getAllingredient pour récupérer tout les utilisateurss de la BDD
 */
router.get("/users", user.getAllUsers);

/**
 * Route pour récupérer tout les utilisateurs par l'id d'une bière
 * Méthode : GET
 * Url: /api/users/:id_beer
 * Description: Cette route appelle le controller ingredientController getingredientById pour récupérer tout les utilisateurs spécifique à une bière
 */
router.get("/users/:id_user", user.getUserById);

/**
 * Route pour supprimmer un ingrédient
 * Méthode : DELETE
 * Url: /api/users/:id_ingredient
 * Description: Cette route appelle le controller ingredientController deletingredientById pour supprimmer un ingrédient
 */
router.delete("/users/:id_user", user.deletUserById);

/**
 * Route pour créer un nouvelle utilisateurs
 * Méthode : POST
 * Url: /api/users
 * Body: {
    "type" : "test",
    "name" : "test" ,
    "description" : "test"
}
 * Description: Cette route appelle le controller ingredientController createingredient pour créer un nouvelle utilisateurs
 */
router.post("/users", user.createUser);

/**
 * Route pour mettre à jour un ingrédient
 * Méthode : PATCH
 * Url: /api/users/:id_ingredient
 * Body: {
    "type" : "test",
    "name" : "test" ,
    "description" : "test"
}
 * Description: Cette route appelle le controller ingredientController upDateingredientById pour mettre à jour un ingrédient avec l'ID passer dans l'url
 */
router.patch("/users/:id_user", user.upDateUserById);
export default router;
