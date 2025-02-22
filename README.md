# gatherkeep-backend

## Structure

Voici comment est structuré GatherKeep

### Couche Domaine (domain/)
- models/ : Contient les entités du domaine (ex: User).

- repositories/ : Interfaces pour les repositories (ex: UserRepository, AuthRepository).

- services/ : Logique métier (ex: AuthService pour la gestion des tokens, UserService pour les opérations utilisateur).

- utils/ : Utilitaires comme la gestion des tokens JWT et le hachage des mots de passe.

### Couche Application (application/)
- use-cases/ : Use cases pour les opérations métier (ex: LoginUseCase, RegisterUseCase).

- dto/ : DTOs pour transférer des données entre les couches.

- exceptions/ : Exceptions personnalisées (ex: InvalidCredentialsException).

### Couche Infrastructure (infrastructure/)
- adapters/ : Implémentations des ports (ex: UserRepositoryImpl, AuthRepositoryImpl).

- config/ : Configuration de Prisma et JWT.

- interceptors/ : Intercepteurs pour gérer les cookies (ex: CookieInterceptor).

- prisma/ : Service Prisma pour interagir avec la base de données.