import { QueryResult } from "pg";
import db from "../utils/db.js";
import { Response, Request } from "express";
import { BeerInterface } from "../models/beer.js";

/**
 * Cette fonction récupère toutes les bières depuis la BDD et renvoie le résultat sous la forme d'un json
 */
const getAllBeers = async (req: Request, res: Response) => {
  try {
    // Execute une requête SQL pour récupérer toutes les lignes de la table beer
    const result: QueryResult<BeerInterface[]> = await db.query(
      "SELECT * FROM beer"
    );

    // Renvoie les données récupérer et un statut 200 (ok)
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    // Renvoie un statut 500 (erreur serveur) avec un message
    res.status(500).json({
      message: "Une erreur est apparu lors de la récupération des bière",
    });
  }
};

/**
 * Cette fonction récupère la bière de l'Id passer en parametre de l'url
 */
const getBeerById = async (req: Request, res: Response) => {
  try {
    // Récupération de l'id dans les paramètre de l'url
    // req.params retourne un objet je dois donc le déstructurer pour récupérer l'id uniquement
    const { id_beer } = req.params;
    // Execute une requête SQL pour récupérer la bière demander
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

    // Si la ressource est trouver renvoie la ressource avec un statut 200 (ok)
    res.status(200).json(result.rows[0]);
  } catch (error) {
    // Renvoie un statut 500 (erreur serveur) avec un message
    res.status(500).json({
      message: "La récupération de à échouer",
    });
  }
};

/**
 * Cette fonction permet de supprimmer la ressource passer en parametre dans l'url avec son id
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

export default { getAllBeers, getBeerById, deletBeerById };
