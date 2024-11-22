import { QueryResult } from "pg";
import db from "../utils/db.js";
import { Response, Request } from "express";
import { BeerInterface } from "../models/beer.js";

/**
 * Cette fonction récupère toutes les bières depuis la BDD et renvoie le résultat sous la forme d'un json
 * Retour :
 *  - un statut 200 (ok) si les bières sont trouvées, retourne les détails de celles-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getAllBeers = async (req: Request, res: Response) => {
  try {
    // Execute une requête SQL pour récupérer toutes les lignes de la table beer
    const result: QueryResult<BeerInterface[]> = await db.query(
      "SELECT * FROM beer"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est apparu lors de la récupération des bière",
    });
  }
};

/**
 * Cette fonction récupère une bière spécifique en fonction de son ID passé dans les paramètres de l'URL
 * Retour :
 *  - un statut 404 (Not Found) si aucune bière avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si la bière est trouvée, retourne les détails de celle-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getBeerById = async (req: Request, res: Response) => {
  try {
    // Récupération de l'id dans les paramètre de l'url
    // req.params retourne un objet je dois donc le déstructurer pour récupérer l'id uniquement
    const { id_beer } = req.params;
    // les paramètre d'url sont automatiquement des string je le parse donc avec le type Number
    const result: QueryResult<BeerInterface> = await db.query(
      "SELECT * FROM beer b WHERE b.id_beer = $1",
      [Number(id_beer)]
    );
    // Vérification que la bière éxiste sinon envoie un message avec un statut 404 (Not Found)
    if (result.rows.length === 0) {
      res.status(404).json({
        message: `Aucune bière n'a été trouvée.`,
      });
      // Stope la function pour éviter la surcharge
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "La récupération de à échouer",
    });
  }
};

/**
 * Cette fonction permet de supprimmer la ressource passer en parametre dans l'url avec son id
 * Retour :
 *  - un statut 200 (ok) si la bière à bien été supprimmer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const deletBeerById = async (req: Request, res: Response) => {
  try {
    const { id_beer } = req.params;
    await db.query("DELETE FROM beer b WHERE b.id_beer = $1", [
      Number(id_beer),
    ]);
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
const createBeer = async (req: Request, res: Response) => {
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

    // RETURNING * permet de retourner le resultat de la nouvel bière dans le result.rows[0]
    const result: QueryResult<BeerInterface> = await db.query(
      "INSERT INTO beer (id_brewerie, id_category, id_picture, name, description, abv, color, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        Number(id_brewerie),
        Number(id_category),
        Number(id_picture),
        name,
        description,
        Number(abv),
        color,
        Number(price),
      ]
    );
    res.status(200).json({
      message: "La bière à été ajouté avec succès",
      beer: result.rows[0], // Contient les détails de la nouvel bière
    });
  } catch (error) {
    res.status(500).json({
      message: "L'ajout a échoué.",
    });
  }
};

/**
 * Cette fonction permet de mettre à jour une bière spécifique
 * Retour :
 *  - un statut 200 (ok) si la bière à bien été mis à jour
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const upDateBeerById = async (req: Request, res: Response) => {
  try {
    const { id_beer } = req.params;
    const { id_picture, name, description, abv, color, price } = req.body;
    const result = await db.query(
      "UPDATE beer b SET id_picture = $1, name = $2, description = $3, abv = $4, color = $5, price = $6 WHERE b.id_beer = $7 RETURNING *",
      [
        Number(id_picture),
        name,
        description,
        Number(abv),
        color,
        Number(price),
        Number(id_beer),
      ]
    );
    res.status(200).json({
      message: "La bière à été mise à jour avec succès",
      beer: result.rows[0], // Contient les détails de la nouvel bière
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
