import { BeerInterface } from "../models/beer";
import db from "../utils/db";

/**
 * Cette classe générique est un service pour les méthode GET POST DELETE et PATCH
 * @constructor Le nom de la table dans la BDD
 */
export class BaseService {
  constructor(private tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Cette fonction récupère toutes les ressources depuis la BDD et renvoie une promise
   *
   * @returns Un promise de type BeerInterface ou BrewerieInterface
   */
  getAll = async <T>(): Promise<T[]> => {
    try {
      const query = `SELECT * FROM ${this.tableName}`;
      const { rows } = await db.query(query);
      return rows as T[];
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des données de ${this.tableName}`
      );
    }
  };

  /**
   * Cette fonction récupère une ressource spécifique en fonction de son ID
   *
   * @param id l'id de la ressource à récupérer
   * @param nameId Le nom de l'id
   * @returns Promise de type BeerInterface, BrewerieInterface ou null
   */
  findById = async <T>(id: string, nameId: string): Promise<T | null> => {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE ${nameId} = $1`;
      const { rows } = await db.query(query, [id]);
      if (rows.length === 0) {
        return null; // Retourne null si aucune donnée trouvée
      }
      return rows[0] as T;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des données de ${this.tableName}`
      );
    }
  };

  /**
   * Cette fonction permet de supprimmer la ressource avec son id
   *
   * @param id L'id de la ressource à supprimer
   * @param nameId Le nom de l'id
   */
  deleteById = async (id: string, nameId: string): Promise<void> => {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE ${nameId} = $1`;
      await db.query(query, [Number(id)]);
    } catch (error) {
      throw new Error(
        `Erreur lors de la suppression des données de ${this.tableName}`
      );
    }
  };

  /**
   * Cette fonction permet de créer une ressource
   *
   * @param data Un objet de type BeerInterface ou BrewerieInterface
   * @returns Une Promise de type BeerInterface ou BrewerieInterface
   */
  create = async <T>(data: { [key: string]: any }): Promise<T> => {
    try {
      const keys = Object.keys(data).join(", "); // Extrait le nom de la colonne
      const placeholders = Object.keys(data)
        .map((_, index) => `$${index + 1}`) // Ex: "$1, $2"
        .join(", ");
      const values = Object.values(data); // Extrait les valeurs de la requête

      const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`;

      const { rows } = await db.query(query, values);
      return rows[0] as T;
    } catch (error) {
      throw new Error(`Erreur lors de la création dans ${this.tableName}`);
    }
  };

  /**
   * Cette fonction permet de mettre à jour une ressource spécifique
   *
   * @param id L'id de la ressource à mettre à jour
   * @param data Un objet de type BeerInterface ou BrewerieInterface
   * @returns
   */
  upDate = async <T>(
    id: string,
    nameId: string,
    data: { [key: string]: any }
  ): Promise<T> => {
    try {
      const placeholders = Object.keys(data)
        .map((key, index) => `${key} = $${index + 1}`) // Ex: "name = $1, country = $2"
        .join(", ");
      //   const values = Object.values(data); // Extrait les valeurs de la requête
      const values = [...Object.values(data), id];
      const query = `UPDATE ${this.tableName} SET ${placeholders} WHERE ${nameId} = $${values.length} RETURNING *`;

      const { rows } = await db.query(query, values);
      return rows[0] as T;
    } catch (error) {
      throw new Error(`Erreur lors de la création dans ${this.tableName}`);
    }
  };

  searchBeersByType = async (
    id_types: string[],
    type: string
  ): Promise<{ beers: BeerInterface[] } | []> => {
    try {
      if (id_types.length === 0) return [];

      // Génère une liste de placeholders pour l'IN (?, ?, ?)
      const placeholders = id_types.map((_, i) => `$${i + 1}`).join(", ");

      const query = `SELECT ${type}.name as ${type}, b.* as beer FROM beer b join ${type} ${type} on ${type}.id_${type} = b.id_${type} where ${type}.id_${type} in (${placeholders})`;

      const { rows } = await db.query(query, id_types);

      if (rows.length === 0) {
        return []; // Retourne null si aucune donnée trouvée
      }

      const formattedResult = {
        beers: rows.map((row: BeerInterface) => row),
      };

      return formattedResult;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des données de ${this.tableName}`
      );
    }
  };
}
