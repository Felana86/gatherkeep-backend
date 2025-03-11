# Projet NestJS - Architecture Hexagonale
## Description

Ce projet est une implémentation d'une architecture hexagonale avec NestJS. Il suit une structure bien définie avec séparation des responsabilités:

* __domain__ : Contient les entités et les interfaces des repositories.
* __application__ :  Gère la logique métier via les services et use-cases.
* __adapters__ : Expose les controleurs pour gérer les requètes HTTP et les DTOs.
* __infrastructure__ : Fournit les outils de persistences (Prisma), sécurité (bcrypt, JWT) et configuration

## Technologies utilisées

* __NestJS__ : Framework backend
* __Prisma__: ORM pour PostgreSQL ou MySQL
* __JWT__ : Authentification des utilisateurs
* __Bcrypt__ : Hashage des mots de passe
* __Docker__ : Containerisation
* __Passport__ : Gestion des stratégies d'authentification


## Installation & Configuration

### Cloner le repo

```
git clone git@github.com:Felana86/gatherkeep-backend.git
cd gatherkeep-backend
```

### Installer les dépendances

```
yarn install
npm install
```

## Configurer l'environnement

Créer un fichier ``.env`` à la racine et ajouter : 

```
DATABASE_URL="postgresql://user:password@localhost:5432/database"
JWT_SECRET="ton_secret"
JWT_EXPIRATION="3600s"
REFRESH_TOKEN_EXPIRATION="7d"
BCRYPT_SALT=10
```

## Exécution avec Docker Compose

### Lancer les services 

```
docker-compose up --build
```

### Arreter les services
```
docker-compose down
```

### exécuter le conteneur

```
docker run -p 3000:3000 --env-file .env nestjs-app
```

## Lancer Prisma

```
npx prisma migrate dev --name init
npx prisma generate
```

## Démarrer l'application

```yarn start:dev
# ou
npm run start:dev
```

