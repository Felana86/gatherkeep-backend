Ce dossier contient les cas d'utilisation et les DTOs.
 - dtos: Définit les objets de transfert de données pour valider et structurer les entrées/sorties de scas d'utilisation.
 - use-cases/ : Contient les règles métier sous forme de classes isolées des frameworks.
 - repositories : Définit les interfaces des repositories (contrat de stockage).

# LA COUCHE APPLICATION (Logique métier et Use Cases)
## Son rôle : 
- Il orchestre la logique métier via les Use Cases, qui sont des scénarios 
concrets comme "Créer un utilisateur", "Authentifier un utilisateur"...
- Cette couche sert à gérer la logique métier et transporter les données entre les différentes couches.

## Ce qu'on y trouve :

### USE-CASES : Contient les cas d'utilisation de l'application.
Exemple : register-user.use-case.ts, login-user.use-case.ts
services/ : Services métier (ex: AuthService), utilisés par les Use Cases.
Exemple : auth.service.ts
dtos/ : Objets de transfert de données internes (différents de ceux d’adapters).
Exemple : user.dto.ts (ex: DTO pour normaliser les objets User internes).

## Pourquoi ?
Ne dépend pas de NestJS (donc testable sans lui).
Peut être utilisé par d'autres interfaces (CLI, WebSocket, Cron jobs...).