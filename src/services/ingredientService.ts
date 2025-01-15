import { BaseService } from "./baseService";
import db from "../utils/db";
import { IngredientByBeerInterface } from "../models/ingredient";

class IngredientService extends BaseService {
  constructor() {
    super("ingredient");
  }

  /**
   * Cette fonction récupère les ingrédients spécifique en fonction de de l'ID d'une bière
   *
   * @param id_beer l'id de la bière
   * @returns Promise de type IngredientByBeerInterface
   */
  findIngredientByIdBeer = async (
    id_beer: string
  ): Promise<IngredientByBeerInterface[]> => {
    try {
      const query = `SELECT name, i.id_ingredient FROM beer_ingredient AS b
      JOIN ingredient AS i ON i.id_ingredient  = b.id_beer_ingredient
      WHERE id_beer = $1`;
      const { rows } = await db.query(query, [id_beer]);
      return rows as IngredientByBeerInterface[];
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des données de beer_ingredient`
      );
    }
  };
}

export default new IngredientService();
