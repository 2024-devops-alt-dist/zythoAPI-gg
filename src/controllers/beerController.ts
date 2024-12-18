import { Response, Request } from "express";
import { BeerInterface } from "../models/beer";
import beerService from "../services/beerService";

/**
 * Cette fonction appel le service beerService.getAll() pour récupérer une liste de bière
 *
 * Retour :
 *  - un statut 200 (ok) si les bières sont trouvées, retourne les détails de celles-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getAllBeers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Execute une requête SQL pour récupérer toutes les lignes de la table beer
    const beers: BeerInterface[] = await beerService.getAll();
    res.status(200).json(beers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est apparu lors de la récupération des bière",
    });
  }
};

/**
 * Cette fonction récupére une bière spécifique avec son id
 *
 * @param id_brewerie
 * @returns
 */
const findBeerById = async (id_beer: string): Promise<BeerInterface | null> => {
  const checkBeerById: BeerInterface | null = await beerService.findById(
    id_beer,
    "id_beer"
  );
  return checkBeerById || null;
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucune bière avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la bière est trouvée, retourne les détails de celle-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getBeerById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Récupération de l'id dans les paramètre de l'url
    // req.params retourne un objet je dois donc le déstructurer pour récupérer l'id uniquement
    const { id_beer } = req.params;
    // les paramètre d'url sont automatiquement des string je le parse donc avec le type Number
    const checkBeerById: BeerInterface | null = await findBeerById(id_beer);
    if (!checkBeerById) {
      res.status(404).json({
        message: "La bière demander n'a pas été trouver",
      });
      return;
    }
    res.status(200).json(checkBeerById);
  } catch (error) {
    res.status(500).json({
      message: "La récupération de à échouer",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service beerService.deleteById pour supprimer une bière spécifique
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucune bière avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la bière à bien été supprimmer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const deletBeerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_beer } = req.params;
    const checkBeerById: BeerInterface | null = await findBeerById(id_beer);
    if (!checkBeerById) {
      res.status(404).json({
        message: "La bière demander n'a pas été trouver",
      });
      return;
    }
    await beerService.deleteById(id_beer, "id_beer");
    res.status(200).json({
      message: "La bière à été supprimmer avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "La suppression à échouer",
    });
  }
};

/**
 * Cette fonction permet de créer une bière
 * Retour :
 *  - un statut 200 (ok) si la nouvelle bière à bien été créer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const createBeer = async (req: Request, res: Response): Promise<void> => {
  try {
    // Déstructuration des propriétés nécessaires depuis le corps de la requête
    const {
      id_brewerie,
      id_category,
      id_picture,
      name,
      description,
      abv,
      color,
      price,
    } = req.body;

    const newBeer: BeerInterface = await beerService.create({
      id_brewerie,
      id_category,
      id_picture,
      name,
      description,
      abv,
      color,
      price,
    });
    res.status(200).json({
      message: "La bière à été ajouté avec succès",
      beer: newBeer,
    });
  } catch (error) {
    res.status(500).json({
      message: "L'ajout a échoué.",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service beerService.upDate pour mettre à jour une bière
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucune bière avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la bière à bien été mis à jour
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const upDateBeerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_beer } = req.params;
    const checkBeerById: BeerInterface | null = await findBeerById(id_beer);
    if (!checkBeerById) {
      res.status(404).json({
        message: "La bière demander n'a pas été trouver",
      });
      return;
    }
    const { id_picture, name, description, abv, color, price } = req.body;
    const newBeer: BeerInterface = await beerService.upDate(
      id_beer,
      "id_beer",
      {
        id_picture,
        name,
        description,
        abv,
        color,
        price,
      }
    );
    res.status(200).json({
      message: "La bière à été mise à jour avec succès",
      beer: newBeer, // Contient les détails de la nouvel bière
    });
  } catch (error) {
    res.status(500).json({
      message: "La mise à jour a échoué.",
    });
  }
};

export default {
  getAllBeers,
  getBeerById,
  deletBeerById,
  createBeer,
  upDateBeerById,
};
