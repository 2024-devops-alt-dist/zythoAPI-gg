import db from "../utils/db";

class AuthService {
  getUserByEmail = async (email: string) => {
    try {
      const querry = `SELECT * FROM users u WHERE $1 = u.email;`;
      const { rows } = await db.query(querry, [email]);
      return rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des données de users`);
    }
  };
}

export default new AuthService();
