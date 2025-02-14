import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
// Configuration de connection avec la BDD
const db = new pg.Pool({
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // host: process.env.DB_HOST,
  // port: 5432,
  // database: process.env.DB_NAME,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Indispensable pour Neon (sinon erreur SSL)
  },
  keepAlive: true,
});

export default db;
