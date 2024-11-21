import db from "../utils/db.js";
import { Response } from "express";

/**
 * Cette fonction récupère toutes les bières depuis la BDD et renvoie le résultat sous la forme d'un json
 *
 * @param res Response<BeerInterface, Record<string, BeerInterface>>
 */
const getAllBeers = async (res: Response) => {
  try {
    // Execute une requête SQL pour récupérer toutes les lignes de la table beer
    const result = await db.query("SELECT * FROM beer");
    // Renvoie les données récupérer et un statut 200 (ok)
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    // // Renvoie un statut 500 (erreur serveur) avec un message
    res.status(500).json({
      message: "Une erreur est apparu lors de la récupération des bière",
    });
  }
};

export default getAllBeers;
