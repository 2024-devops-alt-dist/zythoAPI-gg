import { Response, Request } from "express";
import BrewerieService from "../services/brewerieService";
import { BrewerieInterface } from "../models/brewerie";

/**
 * Cette fonction appel le service BrewerieService.getAll() pour récupérer une liste de brasserie
 *
 * Retour :
 *  - un statut 200 (ok) si les brasseries sont trouvées, retourne les détails de celles-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getAllBrewerie = async (req: Request, res: Response): Promise<void> => {
  try {
    const breweries: BrewerieInterface[] = await BrewerieService.getAll();
    const breweriesWithType = breweries.map((b) => ({
      ...b,
      type: "brewerie",
    }));
    res.status(200).json(breweriesWithType);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est apparue lors de la récupération des brasseries.",
    });
  }
};

/**
 * Cette fonction récupére une brasserie spécifique avec son id
 * @param id_brewerie
 * @returns
 */
const findBrewerieById = async (
  id_brewerie: string
): Promise<BrewerieInterface | null> => {
  const brewerieResult: BrewerieInterface | null =
    await BrewerieService.findById(id_brewerie, "id_brewerie");
  return brewerieResult || null;
};

/**
 *  Cette fonction vérifie si l'id demander éxiste bien dans la BDD
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucune brasserie avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la brasserie est trouvée, retourne les détails de celle-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getBrewerieById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Récupération de l'id dans les paramètre de l'url
    // req.params retourne un objet je dois donc le déstructurer pour récupérer l'id uniquement
    const { id_brewerie } = req.params;
    // les paramètre d'url sont automatiquement des string je le parse donc avec le type Number
    const checkBrawerieById: BrewerieInterface | null = await findBrewerieById(
      id_brewerie
    );
    if (!checkBrawerieById) {
      res.status(404).json({
        message: "La brasserie demander n'a pas été trouver",
      });
      return;
    } else {
      const brewerieWithType = { ...checkBrawerieById, type: "brewerie" };
      res.status(200).json(brewerieWithType);
    }
  } catch (error) {
    res.status(500).json({
      message: "La récupération à échouer",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service BrewerieService.deleteById pour supprimer une brasserie spécifique
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucune brasserie avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la brasserie à bien été supprimmer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const deletBrewerieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_brewerie } = req.params;
    const checkBrawerieById: BrewerieInterface | null = await findBrewerieById(
      id_brewerie
    );
    if (!checkBrawerieById) {
      res.status(404).json({
        message: "La brasserie demander n'a pas été trouver",
      });
      return;
    }
    BrewerieService.deleteById(id_brewerie, "id_brewerie");
    res.status(200).json({
      message: "La brasserie à été supprimmer avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "La suppression à échouer",
    });
  }
};

/**
 * Cette fonction permet de créer une brasserie
 * Retour :
 *  - un statut 200 (ok) si la nouvelle brasserie à bien été créer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const createBrewerie = async (req: Request, res: Response): Promise<void> => {
  try {
    // Déstructuration des propriétés nécessaires depuis le corps de la requête
    const { name, country } = req.body;

    const newBrawerie: BrewerieInterface = await BrewerieService.create({
      name,
      country,
    });
    res.status(200).json({
      message: "La brasserie à été ajouté avec succès",
      brewerie: newBrawerie, // Contient les détails de la nouvel brasserie
    });
  } catch (error) {
    res.status(500).json({
      message: "L'ajout a échoué.",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service BrewerieService.upDate pour mettre à jour une brasserie
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucune brasserie avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la brasserie à bien été mis à jour
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const upDateBrewerieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_brewerie } = req.params;
    const checkBrawerieById: BrewerieInterface | null = await findBrewerieById(
      id_brewerie
    );
    if (!checkBrawerieById) {
      res.status(404).json({
        message: "La brasserie demander n'a pas été trouver",
      });
      return;
    }
    const { name, country } = req.body;
    const newBrewerie: BrewerieInterface = await BrewerieService.upDate(
      id_brewerie,
      "id_brewerie",
      { name, country }
    );
    res.status(200).json({
      message: "La brasserie à été mise à jour avec succès",
      brewerie: newBrewerie, // Contient les détails de la nouvel brasserie
    });
  } catch (error) {
    res.status(500).json({
      message: "La mise à jour a échoué.",
    });
  }
};

export default {
  getAllBrewerie,
  getBrewerieById,
  deletBrewerieById,
  createBrewerie,
  upDateBrewerieById,
};
