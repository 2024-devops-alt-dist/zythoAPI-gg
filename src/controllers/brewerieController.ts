import { Response, Request } from "express";
import BrewerieService from "../services/brewerieService";

/**
 * Cette fonction appel le service BrewerieService.getAll() pour récupérer une liste de brasserie
 *
 * Retour :
 *  - un statut 200 (ok) si les brasseries sont trouvées, retourne les détails de celles-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getAllBrewerie = async (req: Request, res: Response) => {
  try {
    const resultat = await BrewerieService.getAll();
    res.status(200).json(resultat);
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
const findBrewerieById = async (id_brewerie: string) => {
  try {
    const brewerieResult = await BrewerieService.findById(
      id_brewerie,
      "id_brewerie"
    );

    return brewerieResult;
  } catch (error) {
    return null;
  }
};

/**
 *  Cette fonction vérifie si l'id demander éxiste bien dans la BDD
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucune brasserie avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la brasserie est trouvée, retourne les détails de celle-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getBrewerieById = async (req: Request, res: Response) => {
  try {
    // Récupération de l'id dans les paramètre de l'url
    // req.params retourne un objet je dois donc le déstructurer pour récupérer l'id uniquement
    const { id_brewerie } = req.params;
    // les paramètre d'url sont automatiquement des string je le parse donc avec le type Number
    const result = await findBrewerieById(id_brewerie);
    if (!result) {
      res.status(404).json({
        message: "La brasserie demander n'a pas été trouver",
      });
      return;
    }
    res.status(200).json(result);
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
const deletBrewerieById = async (req: Request, res: Response) => {
  try {
    const { id_brewerie } = req.params;
    const result = await findBrewerieById(id_brewerie);
    if (!result) {
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
const createBrewerie = async (req: Request, res: Response) => {
  try {
    // Déstructuration des propriétés nécessaires depuis le corps de la requête
    const { name, country } = req.body;

    // RETURNING * permet de retourner le resultat de la nouvel brasserie dans le result.rows[0]
    const result = await BrewerieService.create({ name, country });
    res.status(200).json({
      message: "La brasserie à été ajouté avec succès",
      brewerie: result, // Contient les détails de la nouvel brasserie
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
    const brewerieResult = await findBrewerieById(id_brewerie);
    if (!brewerieResult) {
      res.status(404).json({
        message: "La brasserie demander n'a pas été trouver",
      });
      return;
    }
    const { name, country } = req.body;
    const result = await BrewerieService.upDate(id_brewerie, { name, country });
    res.status(200).json({
      message: "La brasserie à été mise à jour avec succès",
      brewerie: result, // Contient les détails de la nouvel brasserie
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
