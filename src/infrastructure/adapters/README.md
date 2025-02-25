# INTERFACE ENTRE L'API ET LE DOMAINE METIER

Le dossier adapters contient toutes les interactions entre l'API (NestJS) et le coeur métier (core).
C'est ici que l'on convertit les http en appels à la logique métier,
en utilisant les controolers et services.

# IMPORTANT:

- Aucune logique métier ne doit etre présente ici
- Le dossier adapters est uniquement unpont entre nestJS et le core
- Il adapte les requetes HTTP (ex: REST, GraphQL, Websocket) 
pour appeler les uses cases de "core/application/use-cases/"

# POURQUOI
- Garde le core indépendant du framework NestJS.
- Facilite les tests unitaires (Mock NestJS, remplacer les services externes).
- Respecte l'architecture hexagonale (l'API est juste un adaptateur).
- adapters: contient les interactions entre le domain et les outils externes.
- persistence : spécifie que cet adapter est dédié à la persistence des donénes avec une base de données
- Le nommage important: "user-repository.prisma.ts" montre que c'est l'implémentation Prisma du repository user.

# COMMENT CA FONCTIONNE?
1. Le client envoie une requète HTTP à NestJS
2. Le controller reçoit la requète et l'envoie au service
3. Le service adapte la requète et appele un use-case du core
4. Le use-case exécute la logique métier en utilisant les repositories
5. La réponse est renvoyée au controller, qui la retourne au client