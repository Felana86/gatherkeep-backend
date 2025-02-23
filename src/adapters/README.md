Ce dossier contient les controllers NestJS, qui recoivent les requètes HTTP 
et appellent les use cases.

# POURQUOI?
Le controller ne fait que recevoir et renvoyer les données
Toute la logique métier est déléguée aux use-cases du core

# ADAPTERS : (Couches d'entrée/sortie)
Son rôle : Il connecte l’application au monde extérieur. Il convertit les requêtes HTTP, WebSocket, CLI... en appels aux Use Cases.

Ce qu'on y trouve :

controllers/ : Contrôleurs NestJS qui reçoivent les requêtes et appellent les Use Cases.
Exemple : auth.controller.ts
dto/ : Objets de transfert de données pour la communication API.
Exemple : login-user.dto.ts, register-user.dto.ts
exceptions/ : Gestion des erreurs spécifiques à l’interface utilisateur.
Exemple : http-exception.filter.ts
http/ : Configuration de l’API REST si nécessaire.
Exemple : swagger-config.ts (si tu utilises Swagger)

Pourquoi ?

Les Controllers NestJS n'ont aucune logique métier, ils appellent juste un Use Case et retournent une réponse.
En remplaçant NestJS, on pourrait facilement garder la logique métier intacte.