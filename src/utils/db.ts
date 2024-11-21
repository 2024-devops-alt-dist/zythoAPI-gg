import pg from "pg";
// Configuration de connection avec la BDD
const db = new pg.Pool({
  user: "user",
  password: "pass",
  host: "localhost",
  port: 5432,
  database: "beer-db",
});

export default db;
