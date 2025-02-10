import { Response, Request } from "express";
import userService from "../services/userService";
import { UserInterface } from "../models/user";

/**
 * Cette fonction appel le service getAll() pour récupérer une liste d'utilisateur
 *
 * Retour :
 *  - un statut 200 (ok) si les utilisateurs sont trouvées, retourne le détail
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Execute une requête SQL pour récupérer toutes les lignes de la table beer
    const users: UserInterface[] = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est apparu lors de la récupération des utilisateur",
    });
  }
};

/**
 * Cette fonction récupére un utilisateur spécifique avec son id
 *
 * @param id_brewerie
 * @returns
 */
const findUserById = async (id_user: string): Promise<UserInterface | null> => {
  const checkUserById: UserInterface | null = await userService.findById(
    id_user,
    "id_user"
  );
  return checkUserById || null;
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucun utilisateur avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si l'utilisateur est trouvée, retourne les détails de celui-ci
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Récupération de l'id dans les paramètre de l'url
    // req.params retourne un objet je dois donc le déstructurer pour récupérer l'id uniquement
    const { id_user } = req.params;
    // les paramètre d'url sont automatiquement des string je le parse donc avec le type Number
    const checkUserById: UserInterface | null = await findUserById(id_user);
    if (!checkUserById) {
      res.status(404).json({
        message: "L'utilisateur demandé n'a pas été trouvé",
      });
      return;
    }
    res.status(200).json(checkUserById);
  } catch (error) {
    res.status(500).json({
      message: "La récupération de à échouer",
    });
  }
};

/**
 * Cette fonction vérifie si l'id demander éxiste bien dans la BDD et
 * appel le service deleteById pour supprimer un utilisateur spécifique
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucun utilisateur avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si l'utilisateur à bien été supprimmer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const deletUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_user } = req.params;
    const checkUserById: UserInterface | null = await findUserById(id_user);
    if (!checkUserById) {
      res.status(404).json({
        message: "L'utilisateur demandé n'a pas été trouvé",
      });
      return;
    }
    await userService.deleteById(id_user, "id_user");
    res.status(200).json({
      message: "L'utilisateur à été supprimmé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "La suppression à échouer",
    });
  }
};

/**
 * Cette fonction permet de créer un utilisateur
 * Retour :
 *  - un statut 200 (ok) si le nouvel utilisateur à bien été créer
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Déstructuration des propriétés nécessaires depuis le corps de la requête
    const { id_user, first_name, last_name, email } = req.body;
    console.log("Payload reçu :", req.body);
    const newBeer: UserInterface = await userService.create({
      id_user,
      first_name,
      last_name,
      email,
    });
    res.status(200).json({
      message: "L'utilisateur à été ajouté avec succès",
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
 * appel le service upDate pour mettre à jour un utilisateur
 *
 * Retour :
 *  - un statut 404 (Not Found) si aucun utilisateur avec cet ID n'est trouvée dans la base de données
 *  - un statut 200 (ok) si l'utilisateur à bien été mis à jour
 *  - un statut 500 (Internal Server Error) en cas d'erreur inattendue lors de la requête
 */
const upDateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_user } = req.params;
    const checkUserById: UserInterface | null = await findUserById(id_user);
    if (!checkUserById) {
      res.status(404).json({
        message: "L'utilisateur demander n'a pas été trouver",
      });
      return;
    }
    const { first_name, last_name, email } = req.body;
    const newBeer: UserInterface = await userService.upDate(
      id_user,
      "id_user",
      {
        first_name,
        last_name,
        email,
      }
    );
    res.status(200).json({
      message: "L'utilisateur à été mise à jour avec succès",
      beer: newBeer, // Contient les détails du nouvel utilisateur
    });
  } catch (error) {
    res.status(500).json({
      message: "La mise à jour a échoué.",
    });
  }
};

export default {
  getAllUsers,
  getUserById,
  deletUserById,
  createUser,
  upDateUserById,
};
