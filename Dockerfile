# Utiliser une image Node.js compatible
FROM node:20 as builder

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./
COPY prisma ./prisma

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Compiler le projet (si nécessaire pour TypeScript)
RUN npm run build

# Exposer le port de l'application
FROM node:20 as prod

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]