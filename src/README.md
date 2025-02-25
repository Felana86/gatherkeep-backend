# Explication globale du fonctionnement de l'architecture hexagonale de ce projet pour une use-case

## Récapitulatif des couches et des flux de données

### Les adapters/controller appellent les use-cases
Les controllers récupèrent les données de la requète, les valident avec les DTOs, puis les passent aux "use-cases" de la couche "application".

### La couche "application" contient les "use-cases" contiennent la logique métier
- Ils orchestrent les opérations en appelant les services
- Les services transforment et manipulent les données en entrée, puis appellent les repositories de la couche domain

### La couche "domain" est responsable des règles métier
- Les repositories définissent des interfaces qui sont implémentées dans la couche infrastructure (avec Prisma etc...)
- Les entities représentent les objets métier sous forme de classes (ex: UserEntity)



### EXEMPLE de requète

EXECUTION D'UNE REQUETE POST/login

1- L'utilisateur envoie une requète à /login

2- "UserController.login()" reçiot la requète et la valide avec "LoginUserDto"

3- Il passe les données au "AuthenticationUseCase.loginUser()"

4- AuthenticationUseCase appelle "UserService.loginUser()" pour vérifier l'authentification

5- "UserService" cherche l'utilisateur avec "UserRepositoryDomain.findByEmail()"

6- "UserRepositoryPrisma" exécute une requète Prisma pour récupérer l'utilisateur

7- Les données remontent en passant par "UserService" -> "AuthenticationUseCase" -> "UserController"

8- Le controller retourne la réponse avec l'accessToken et le refreshToken


