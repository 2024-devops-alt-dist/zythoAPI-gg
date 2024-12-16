import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import YAML from "yamljs";

export const setupSwagger = (app: Application) => {
  try {
    // Charge le fichier swagger.yaml depuis le chemin monté dans le conteneur Docker
    const swaggerDoc = YAML.load("/usr/src/app/swagger.yaml");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    console.log("Swagger disponible sur http://db:3000/api-docs");
  } catch (error) {
    console.log("erreur", error);
  }
};
