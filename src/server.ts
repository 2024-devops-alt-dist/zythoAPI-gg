import express from "express";
import db from "./utils/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API react ");
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
