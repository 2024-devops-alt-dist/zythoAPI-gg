# Contexte du projet

Après la mise en place de notre base de données pleine d'infos sur les bières artisanales, il est temps de s'attaquer à la prochaine étape : le développement de l'API.

On vise à créer une API REST, à la fois simple et performante, qui va nous permettre de manipuler les informations sur les bières avec des opérations de base comme créer, lire, mettre à jour, et supprimer (les fameuses opérations CRUD). Cette API sera le pilier central de l'application mobile en devenir, offrant un accès facile à une large collection de bières et rendant l'expérience utilisateur encore plus riche.

En utilisant la base de données créée selon les spécifications du brief précédent, cette API permettra de naviguer à travers un univers de bières artisanales venues des quatre coins du monde, de les partager et de découvrir de nouvelles saveurs.

## Technologies et Outils

Développe l'API en utilisant Node.js avec Express. Utilisation de TypeScript pour un typage strict et une meilleure maintenabilité.

## Contraintes

Pas d'ORM : Gère les requêtes SQL préparées directement dans les contrôleurs.
Respect des principes REST et documentation détaillée de l'API.
Un fichier Dockerfile doit être créé pour l'API et intégré en tant que conteneur dans le fichier docker-compose.yml

# Initialisation de Node.js et Express avec TypeScript

Ce projet utilise Node.js, Express et TypeScript pour créer une application web rapide et modulaire.

## Initialisation des dépendance

Pour démarrer le projet, exécutez la commande suivante afin d'installer toutes les dépendances nécessaires :

```bash
 docker compose up --build
```

[Api disponnible](http://localhost:3000/api/beers)

# Documentation de l'API

Cette API permet de gérer des **bières** et des **brasseries**. Ci-dessous, vous trouverez les différentes routes disponibles, leurs méthodes, paramètres et descriptions.

---

## Table des matières

1. [Accès à la documentation Swagger](#accès-à-la-documentation-swagger)
2. [Routes pour les bières](http://localhost:3000/api/beers)
3. [Routes pour les brasseries](http://localhost:3000/api/brewerie)

---

## Accès à la documentation Swagger

Pour une documentation interactive complète des routes de cette API, rendez-vous à l'URL suivante :

- **Swagger UI** : [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Swagger vous permet de :

- Visualiser toutes les routes disponibles.
- Tester les routes en envoyant des requêtes directement d

## Routes pour les bières

### 1. Récupérer toutes les bières

- **Méthode** : `GET`
- **URL** : `/api/beers`
- **Description** : Retourne toutes les bières disponibles dans la base de données.
- **Contrôleur** : `beers.getAllBeers`

---

### 2. Récupérer une bière spécifique

- **Méthode** : `GET`
- **URL** : `/api/beers/:id_beer`
- **Paramètres** :
  - `id_beer` : ID de la bière à récupérer.
- **Description** : Retourne les détails d'une bière spécifique.
- **Contrôleur** : `beers.getBeerById`

---

### 3. Supprimer une bière

- **Méthode** : `DELETE`
- **URL** : `/api/beers/:id_beer`
- **Paramètres** :
  - `id_beer` : ID de la bière à supprimer.
- **Description** : Supprime une bière de la base de données.
- **Contrôleur** : `beers.deletBeerById`

---

### 4. Créer une nouvelle bière

- **Méthode** : `POST`
- **URL** : `/api/beers`
- **Body** :
  - `id_brewerie` (int) : ID de la brasserie.
  - `id_category` (int) : ID de la catégorie.
  - `id_picture` (int) : ID de l'image associée.
  - `name` (string) : Nom de la bière.
  - `description` (string) : Description de la bière.
  - `abv` (float) : Taux d'alcool (en pourcentage).
  - `color` (string) : Couleur de la bière.
  - `price` (float) : Prix de la bière.
- **Description** : Crée une nouvelle bière dans la base de données.
- **Contrôleur** : `beers.createBeer`

---

### 5. Mettre à jour une bière

- **Méthode** : `PATCH`
- **URL** : `/api/beers/:id_beer`
- **Paramètres** :
  - `id_beer` : ID de la bière à mettre à jour.
- **Body** :
  - `id_picture` (int) : ID de l'image associée.
  - `name` (string) : Nom de la bière.
  - `description` (string) : Description de la bière.
  - `abv` (float) : Taux d'alcool (en pourcentage).
  - `color` (string) : Couleur de la bière.
  - `price` (float) : Prix de la bière.
- **Description** : Met à jour les informations d'une bière spécifique.
- **Contrôleur** : `beers.upDateBeerById`

---

## Routes pour les brasseries

### 1. Récupérer toutes les brasseries

- **Méthode** : `GET`
- **URL** : `/api/brewerie`
- **Description** : Retourne toutes les brasseries disponibles dans la base de données.
- **Contrôleur** : `brewerie.getAllBrewerie`

---

### 2. Récupérer une brasserie spécifique

- **Méthode** : `GET`
- **URL** : `/api/brewerie/:id_brewerie`
- **Paramètres** :
  - `id_brewerie` : ID de la brasserie à récupérer.
- **Description** : Retourne les détails d'une brasserie spécifique.
- **Contrôleur** : `brewerie.getBrewerieById`

---

### 3. Supprimer une brasserie

- **Méthode** : `DELETE`
- **URL** : `/api/brewerie/:id_brewerie`
- **Paramètres** :
  - `id_brewerie` : ID de la brasserie à supprimer.
- **Description** : Supprime une brasserie de la base de données.
- **Contrôleur** : `brewerie.deletBrewerieById`

---

### 4. Créer une nouvelle brasserie

- **Méthode** : `POST`
- **URL** : `/api/brewerie`
- **Body** :
  - `name` (string) : Nom de la brasserie.
  - `country` (string) : Pays d'origine de la brasserie.
- **Description** : Crée une nouvelle brasserie dans la base de données.
- **Contrôleur** : `brewerie.createBrewerie`

---

### 5. Mettre à jour une brasserie

- **Méthode** : `PATCH`
- **URL** : `/api/brewerie/:id_brewerie`
- **Paramètres** :
  - `id_brewerie` : ID de la brasserie à mettre à jour.
- **Body** :
  - `name` (string) : Nom de la brasserie.
  - `country` (string) : Pays d'origine de la brasserie.
- **Description** : Met à jour les informations d'une brasserie spécifique.
- **Contrôleur** : `brewerie.upDateBrewerieById`

---

## Notes

- Toutes les routes de l'API sont préfixées par `/api`.
- Assurez-vous que le serveur Express est correctement configuré pour répondre aux requêtes.
- Les erreurs sont renvoyées sous forme de réponses HTTP standard avec des codes d'état appropriés.
