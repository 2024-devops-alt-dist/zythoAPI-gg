import { Response, Request } from "express";
import ingredientService from "../services/ingredientService";
import { IngredientInterface } from "../models/ingredient";

/**
 * Cette fonction appel le service ingredientService.getAll() pour récupérer une liste d'ingrédients
 *
 * Retour :
 *  - un statut 200 (ok) si les ingrédients sont trouvées, retourne les détails de celui-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getAllIngredient = async (req: Request, res: Response): Promise<void> => {
  try {
    const ingredients: IngredientInterface[] = await ingredientService.getAll();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est apparue lors de la récupération des ingrédients.",
    });
  }
};

/**
 * Cette fonction récupére un ingrédient spécifique avec son id
 * @param id_ingredient
 * @returns
 */
const findIngredientById = async (
  id_ingredient: string
): Promise<IngredientInterface | null> => {
  const ingredient: IngredientInterface | null =
    await ingredientService.findById(id_ingredient, "id_ingredient");
  return ingredient || null;
};

/**
 *  Cette fonction vérifie si l'id demander éxiste bien dans la BDD
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucun ingrédient avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si l'ingrédient est trouvée, retourne les détails de celui ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getIngredientById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Récupération de l'id dans les paramètre de l'url
    // req.params retourne un objet je dois donc le déstructurer pour récupérer l'id uniquement
    const { id_ingredient } = req.params;
    // les paramètre d'url sont automatiquement des string je le parse donc avec le type Number
    const checkIngredientById: IngredientInterface | null =
      await findIngredientById(id_ingredient);
    if (!checkIngredientById) {
      res.status(404).json({
        message: "L'ingrédient demandé n'a pas été trouver",
      });
      return;
    }
    res.status(200).json(checkIngredientById);
  } catch (error) {
    res.status(500).json({
      message: "La récupération à échouer",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service ingredientService.deleteById pour supprimer un ingrédient spécifique
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucun ingrédient avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si l'ingrédient à bien été supprimer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const deleteIngredientById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_ingredient } = req.params;
    const checkIngredientById: IngredientInterface | null =
      await findIngredientById(id_ingredient);
    if (!checkIngredientById) {
      res.status(404).json({
        message: "L'ingrédient demandé n'a pas été trouvé",
      });
      return;
    }
    ingredientService.deleteById(id_ingredient, "id_ingredient");
    res.status(200).json({
      message: "L'ingrédient à été supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "La suppression à échoué",
    });
  }
};

/**
 * Cette fonction permet de créer un ingrédient
 * Retour :
 *  - un statut 200 (ok) si le nouvel ingrédient à bien été créé
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const createIngredient = async (req: Request, res: Response): Promise<void> => {
  try {
    // Déstructuration des propriétés nécessaires depuis le corps de la requête
    const { name, description, type } = req.body;

    const newIngredient: IngredientInterface = await ingredientService.create({
      name,
      description,
      type,
    });
    res.status(200).json({
      message: "L'ingrédient à été ajouté avec succès",
      brewerie: newIngredient, // Contient les détails de la nouvel ingrédient
    });
  } catch (error) {
    res.status(500).json({
      message: "L'ajout a échoué.",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service ingredientService.upDate pour mettre à jour un ingrédient
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucun ingrédient avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si l'ingrédient à bien été mis à jour
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
        message: "L'ingrédient demandé n'a pas été trouvé",
      });
      return;
    }
    const { name, description, type } = req.body;
    const newIngredient: IngredientInterface = await ingredientService.upDate(
      id_ingredient,
      "id_ingredient",
      { name, description, type }
    );
    res.status(200).json({
      message: "L'ingrédient à été mise à jour avec succès",
      brewerie: newIngredient, // Contient les détails de la nouvel ingrédient
    });
  } catch (error) {
    res.status(500).json({
      message: "La mise à jour a échoué.",
    });
  }
};

export default {
  getAllIngredient,
  getIngredientById,
  deleteIngredientById,
  createIngredient,
  upDateIngredientById,
};
