# Contexte du projet

Après la mise en place de notre base de données pleine d'infos sur les bières artisanales, il est temps de s'attaquer à la prochaine étape : le développement de l'API.

On vise à créer une API REST, à la fois simple et performante, qui va nous permettre de manipuler les informations sur les bières avec des opérations de base comme créer, lire, mettre à jour, et supprimer (les fameuses opérations CRUD). Cette API sera le pilier central de l'application mobile en devenir, offrant un accès facile à une large collection de bières et rendant l'expérience utilisateur encore plus riche.

En utilisant la base de données créée selon les spécifications du brief précédent, cette API permettra de naviguer à travers un univers de bières artisanales venues des quatre coins du monde, de les partager et de découvrir de nouvelles saveurs.

## Documentation

Documente clairement l'API en utilisant Swagger (OpenAPI), afin de fournir une interface interactive et compréhensible pour faciliter l'intégration avec d'autres services.

## Technologies et Outils

Développe l'API en utilisant Node.js avec Express. Utilisation de TypeScript pour un typage strict et une meilleure maintenabilité.

## Contraintes

Pas d'ORM : Gère les requêtes SQL préparées directement dans les contrôleurs.
Respect des principes REST et documentation détaillée de l'API.
Un fichier Dockerfile doit être créé pour l'API et intégré en tant que conteneur dans le fichier docker-compose.yml
