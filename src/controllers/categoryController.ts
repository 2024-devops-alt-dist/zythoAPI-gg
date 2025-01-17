import { Response, Request } from "express";
import CategoryService from "../services/categoryService";
import { CategoryInterface } from "../models/category";

/**
 * Cette fonction appel le service categoryService.getAll() pour récupérer une liste de categorie
 *
 * Retour :
 *  - un statut 200 (ok) si les categories sont trouvées, retourne les détails de celles-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories: CategoryInterface[] = await CategoryService.getAll();
    const categoriesWithType = categories.map((c) => ({
      ...c,
      type: "category",
    }));
    res.status(200).json(categoriesWithType);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est apparue lors de la récupération des categories.",
    });
  }
};

/**
 * Cette fonction récupére une categorie spécifique avec son id
 * @param id_category
 * @returns
 */
const findCategoryById = async (
  id_category: string
): Promise<CategoryInterface | null> => {
  const categoryResult: CategoryInterface | null =
    await CategoryService.findById(id_category, "id_category");
  return categoryResult || null;
};

/**
 *  Cette fonction vérifie si l'id demander éxiste bien dans la BDD
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucune categorie avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la categorie est trouvée, retourne les détails de celle-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Récupération de l'id dans les paramètre de l'url
    // req.params retourne un objet je dois donc le déstructurer pour récupérer l'id uniquement
    const { id_category } = req.params;
    // les paramètre d'url sont automatiquement des string je le parse donc avec le type Number
    const checkCategoryById: CategoryInterface | null = await findCategoryById(
      id_category
    );
    if (!checkCategoryById) {
      res.status(404).json({
        message: "La categorie demander n'a pas été trouver",
      });
      return;
    }
    const categorieWithType = { ...checkCategoryById, type: "category" };
    res.status(200).json(categorieWithType);
  } catch (error) {
    res.status(500).json({
      message: "La récupération à échouer",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service categoryService.deleteById pour supprimer une categorie spécifique
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucune categorie avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la categorie à bien été supprimmer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const deletCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_category } = req.params;
    const checkCategoryById: CategoryInterface | null = await findCategoryById(
      id_category
    );
    if (!checkCategoryById) {
      res.status(404).json({
        message: "La categorie demander n'a pas été trouver",
      });
      return;
    }
    CategoryService.deleteById(id_category, "id_category");
    res.status(200).json({
      message: "La categorie à été supprimmer avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "La suppression à échouer",
    });
  }
};

/**
 * Cette fonction permet de créer une categorie
 * Retour :
 *  - un statut 200 (ok) si la nouvelle categorie à bien été créer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    // Déstructuration des propriétés nécessaires depuis le corps de la requête
    const { name } = req.body;

    const newCategory: CategoryInterface = await CategoryService.create({
      name,
    });
    res.status(200).json({
      message: "La categorie à été ajouté avec succès",
      category: newCategory, // Contient les détails de la nouvel categorie
    });
  } catch (error) {
    res.status(500).json({
      message: "L'ajout a échoué.",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service categoryService.upDate pour mettre à jour une categorie
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucune categorie avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la categorie à bien été mis à jour
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const upDateCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_category } = req.params;
    const checkCategoryById: CategoryInterface | null = await findCategoryById(
      id_category
    );
    if (!checkCategoryById) {
      res.status(404).json({
        message: "La categorie demander n'a pas été trouver",
      });
      return;
    }
    const { name } = req.body;
    const newCategory: CategoryInterface = await CategoryService.upDate(
      id_category,
      "id_category",
      { name }
    );
    res.status(200).json({
      message: "La categorie à été mise à jour avec succès",
      category: newCategory, // Contient les détails de la nouvel categorie
    });
  } catch (error) {
    res.status(500).json({
      message: "La mise à jour a échoué.",
    });
  }
};

export default {
  getAllCategories,
  getCategoryById,
  deletCategoryById,
  createCategory,
  upDateCategoryById,
};
