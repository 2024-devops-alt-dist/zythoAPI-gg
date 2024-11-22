# Utiliser une image officielle Node.js
FROM node:18

# Définir le répertoire de travail dans le container
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json (s'ils existent)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du projet
COPY . .

# Exposer le port sur lequel l'application tourne
EXPOSE 3000

# Commande pour lancer l'application
CMD ["npm", "run", "dev"]
