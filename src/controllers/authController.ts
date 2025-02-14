import authService from "../services/authService";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userService from "../services/userService";
import { AuthInterface } from "../models/auth";
import { UserInterface } from "../models/user";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const existUser: UserInterface = await authService.getUserByEmail(email);
    if (!existUser) {
      res.status(401).json({
        message: "L'utilisateur n'existe pas vous devez vous inscrire.",
      });
      return;
    } else {
      const isMatchPassword = bcrypt.compare(password, existUser.password);
      if (!isMatchPassword) {
        res.status(401).json({
          message: "Le mot de passe est invalid.",
        });
        return;
      } else {
        const token = jwt.sign(
          { id: existUser.password, role: existUser.role },
          process.env.JWT_SECRET as string,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token, user: existUser });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur" });
  }
};

/**
 * Cette fonction permet d'enregistrer un nouvel utilisateur
 * Vérifie que l'email n'éxiste pas en BDD
 * - si oui envoi un statut 409 la ressource esiste déjà
 * - si non :
 *  Check la validité du mot de passe avec un regex
 * - si le mot de passe est valide
 *  - hash le mot de passe envoyé par l'utilisateur avec bcryptJS
 *  - sauvegarde le nouvel utilisateur en BDD
 *  - retourne un statut 201
 * - si non un statut 400 mot de passe invalid
 */
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Déstructuration des propriétés nécessaires depuis le corps de la requête
    const { email, password, first_name, description, last_name } = req.body;

    const existUser: AuthInterface = await authService.getUserByEmail(email);
    if (existUser) {
      res.status(409).json({ message: "L'utilisateur existe déjà." });
      return;
    }
    console.log("Payload reçu :", req.body);
    if (checkValidPassword(password)) {
      const newPassword = await hashPassword(password);

      // Créer user
      const newUser = await userService.create({
        email,
        password: newPassword,
        first_name,
        description,
        last_name,
        role: "USER",
      });
      res.status(200).json({
        message: "Nouvel utilisateur créer",
        user: newUser,
      });
    } else {
      res.status(400).json({
        message: "Le mot de passe est invalid",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur",
    });
  }
};

const checkValidPassword = (password: string) => {
  const regPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{11,30}$"
  );
  return regPassword.test(password);
};

const hashPassword = async (password: string) => {
  // Générer un salt
  const salt = await bcrypt.genSalt(10);
  // Hasher le mdp
  return await bcrypt.hash(password, salt);
};

export default { register, login, hashPassword };
