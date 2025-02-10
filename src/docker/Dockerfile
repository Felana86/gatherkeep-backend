# Utiliser une image Node.js compatible
FROM node:20

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Générer le client Prisma
# RUN npx prisma generate
# RUN npx run migrate


# Compiler le projet (si nécessaire pour TypeScript)
RUN npm run build

# Exposer le port de l'application
EXPOSE 3000

# Commande par défaut pour démarrer l'application
# CMD [  "npm", "start","dev", "start:migrate:prod", "npm","run","migrate"]
CMD ["npm", "run", "start"]