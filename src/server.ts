import express from "express";
import db from "./utils/db";
import beerRoutes from "./routes/beerRoutes";
import brewerieRoute from "./routes/brewerieRoute";
import ingredientRoute from "./routes/ingredientRoute";
import categoriesRoute from "./routes/categoryRoute";
import filterSearch from "./routes/filterSearchRoute";
import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import { setupSwagger } from "../openapi.config";
const app = express(); // Création d'une application Express
const PORT = process.env.PORT || 10000;
const cors = require("cors"); // Port d'écoute, par defaut 300 si aucune variable d'env n'est définie
app.use(express.json());

/**
 * Connection a la BDD
 * Vérifie si la BDD est accessible avant d'exposer les routes
 */
db.connect((err) => {
  // Si une erreur lors de la connection on lève une erreur
  if (err) throw err;
  console.log("Connected!");
  // Route de base pour voir si l'API fonctionne
  const allowedOrigins = [
    "https://zytho-front-38l16bmhw-gwenhannas-projects.vercel.app",
  ];
  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
      allowedHeaders: ["Content-Type", "Authorization"], // Headers autorisés
      credentials: true, // Si besoin d'envoyer des cookies
    })
  );
  app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API de bières");
  });
  // Une fois connecter, ajoute les routes
  app.use("/api", beerRoutes); // Préfixe des routes
  app.use("/api", brewerieRoute); // Préfixe des routes
  app.use("/api", ingredientRoute); // Préfixe des routes
  app.use("/api", categoriesRoute); // Préfixe des routes
  app.use("/api", userRoute); // Préfixe des routes
  app.use("/api", authRoute); // Préfixe des routes
  app.use("/api", filterSearch); // Préfixe des routes

  // Configuration Swagger
  setupSwagger(app);

  // Lancement du serveur Express
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
});
