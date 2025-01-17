import { Response, Request } from "express";
import IngredientService from "../services/ingredientService";
import {
  IngredientByBeerInterface,
  IngredientInterface,
} from "../models/ingredient";
import ingredientService from "../services/ingredientService";

/**
 * Cette fonction appel le service Ingredientervice.getAll() pour récupérer une liste de ingredient
 *
 * Retour :
 *  - un statut 200 (ok) si les ingredients sont trouvées, retourne les détails de celles-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getAllIngredient = async (req: Request, res: Response): Promise<void> => {
  try {
    // Execute une requête SQL pour récupérer toutes les lignes de la table beer
    const ingredients: IngredientInterface[] = await IngredientService.getAll();
    const ingredientsWithType = ingredients.map((i) => ({
      ...i,
      type: "ingredient",
    }));

    res.status(200).json(ingredientsWithType);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est apparu lors de la récupération des ingredient",
    });
  }
};

/**
 * Cette fonction récupére une ingredient spécifique avec son id
 *
 * @param id_ingredient
 * @returns
 */
const findIngredientById = async (
  id_ingredient: string
): Promise<IngredientInterface | null> => {
  const checkIngredientById: IngredientInterface | null =
    await IngredientService.findById(id_ingredient, "id_ingredient");
  return checkIngredientById || null;
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucun ingredient avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si l'ingredient est trouvé, retourne les détails de cellui-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getIngredientByIdBeer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Récupération de l'id dans les paramètre de l'url
    // req.params retourne un objet je dois donc le déstructurer pour récupérer l'id uniquement
    const { id_beer } = req.params;
    // les paramètre d'url sont automatiquement des string je le parse donc avec le type Number
    const checkIngredientById = await ingredientService.findIngredientByIdBeer(
      id_beer
    );
    if (!checkIngredientById) {
      res.status(404).json({
        message: "L'ingredient demander n'a pas été trouver",
      });
      return;
    }
    const ingredientWithType = { ...checkIngredientById, type: "ingredient" };
    res.status(200).json(ingredientWithType);
  } catch (error) {
    res.status(500).json({
      message: "La récupération à échouer",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service Ingredientervice.deleteById pour supprimer un ingredient spécifique
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucun ingredient avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si l'ingredient à bien été supprimmer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const deletIngredientById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_ingredient } = req.params;
    const checkIngredientById: IngredientInterface | null =
      await findIngredientById(id_ingredient);
    if (!checkIngredientById) {
      res.status(404).json({
        message: "L'ingredient demander n'a pas été trouver",
      });
      return;
    }
    IngredientService.deleteById(id_ingredient, "id_ingredient");
    res.status(200).json({
      message: "L'ingredient à été supprimmer avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "La suppression à échouer",
    });
  }
};

/**
 * Cette fonction permet de créer un ingredient
 * Retour :
 *  - un statut 200 (ok) si le nouvel ingredient à bien été créer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const createIngredient = async (req: Request, res: Response): Promise<void> => {
  try {
    // Déstructuration des propriétés nécessaires depuis le corps de la requête
    const { name, description, type } = req.body;

    const newIngredient: IngredientInterface = await IngredientService.create({
      type,
      name,
      description,
    });
    res.status(200).json({
      message: "L'ingrédient à été ajouté avec succès",
      beer: newIngredient,
    });
  } catch (error) {
    res.status(500).json({
      message: "L'ajout a échoué.",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service Ingredientervice.upDate pour mettre à jour une ingredient
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucun ingredient avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si l'ingredient à bien été mis à jour
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const upDateIngredientById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_ingredient } = req.params;
    const checkIngredientById: IngredientInterface | null =
      await findIngredientById(id_ingredient);
    if (!checkIngredientById) {
      res.status(404).json({
        message: "L'ingredient demander n'a pas été trouver",
      });
      return;
    }
    const { name, description, type } = req.body;
    const newIngredient: IngredientByBeerInterface =
      await IngredientService.upDate(id_ingredient, "id_ingredient", {
        name,
        description,
        type,
      });
    res.status(200).json({
      message: "L'ingredient à été mis à jour avec succès",
      ingredient: newIngredient, // Contient les détails de la nouvel ingredient
    });
  } catch (error) {
    res.status(500).json({
      message: "La mise à jour a échoué.",
    });
  }
};

export default {
  getAllIngredient,
  getIngredientByIdBeer,
  deletIngredientById,
  createIngredient,
  upDateIngredientById,
};
