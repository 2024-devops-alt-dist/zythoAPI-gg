import express from "express";
import db from "./utils/db.js";
import beerRoutes from "./routes/beerRoutes.js";
const app = express(); // Création d'une application Express
const PORT = process.env.PORT || 3000; // Port d'écoute, par defaut 300 si aucune variable d'env n'est définie

// Route de base pour voir si l'API fonctionne
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de bières");
});

// Lancement du serveur Express
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

/**
 * Connection a la BDD
 * Vérifie si la BDD est accessible avant d'exposer les routes
 */
db.connect((err) => {
  // Si une erreur lors de la connection on lève une erreur
  if (err) throw err;
  console.log("Connected!");
  // Une fois connecter, ajoute les routes
  app.use("/api", beerRoutes); // Préfixe des routes
});
