import { QueryResult } from "pg";
import db from "../utils/db";
import { Response, Request } from "express";
import { BrewerieInterface } from "../models/brewerie";

/**
 * Cette fonction récupère toutes les brasseries depuis la BDD et renvoie le résultat sous la forme d'un json
 * Retour :
 *  - un statut 200 (ok) si les brasseries sont trouvées, retourne les détails de celles-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getAllBrewerie = async (req: Request, res: Response) => {
  try {
    // Execute une requête SQL pour récupérer toutes les lignes de la table brewerie
    const result: QueryResult<BrewerieInterface[]> = await db.query(
      "SELECT * FROM brewerie"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est apparu lors de la récupération des brasseries",
    });
  }
};

const findBrewerieById = async (id_brewerie: string) => {
  const brewerieResult: QueryResult<BrewerieInterface> = await db.query(
    "SELECT * FROM brewerie b WHERE b.id_brewerie = $1",
    [Number(id_brewerie)]
  );
  return brewerieResult.rows[0] || null;
};

/**
 * Cette fonction récupère une brasserie spécifique en fonction de son ID passé dans les paramètres de l'URL
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
 * Cette fonction permet de supprimmer la ressource passer en parametre dans l'url avec son id
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
    await db.query("DELETE FROM brewerie b WHERE b.id_brewerie = $1", [
      Number(id_brewerie),
    ]);
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
    const result: QueryResult<BrewerieInterface> = await db.query(
      "INSERT INTO brewerie (name, country) VALUES ($1, $2) RETURNING *",
      [name, country]
    );
    res.status(200).json({
      message: "La brasserie à été ajouté avec succès",
      brewerie: result.rows[0], // Contient les détails de la nouvel brasserie
    });
  } catch (error) {
    res.status(500).json({
      message: "L'ajout a échoué.",
    });
  }
};

/**
 * Cette fonction permet de mettre à jour une brasserie spécifique
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
    const result = await db.query(
      "UPDATE brewerie b SET name = $1, country = $2 RETURNING *",
      [name, country]
    );
    res.status(200).json({
      message: "La brasserie à été mise à jour avec succès",
      brewerie: result.rows[0], // Contient les détails de la nouvel brasserie
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
