# SRC/CORE: MODELE METIER ET LOGIQUE APPLICATIVE
Le dossier Core représente la partie pure de l'application,
totalement indépendante des frameworks et de l'infrastructure.
Il représente les règles métiers, les cas d'utilisation et les contrats nécessaires pour 
garantir une séparatin claire entre la logique métier et l'implémentation technique.
Ce dossier contient les entités métier et les interfaces.

- Les entités métier vont représenter les modèles Prisma, 
mais sous forme domaine, sans dépendance à Prisma. Les entités sont le business models
- Les interfaces des repositories permet d'abstraire l'accès à la base de données.
- Les uses-cases représentent les cas d'utilisation. C'est-à-dire, les services métier de l'application.

# POURQUOI

## Indépendance: 
 Le core ne dépend ni de NestJS, ni de Prisma, ni de services tiers.
 
## Testabilité :
Toute la logique métier peut etre utilisée indépendamment des bases de données ou des API externes.

## Scalabilité : 
Possibilité de changer la base de données ou le framework web sans modifier le core.

## Architecture hexagonale : 
Séparation stricte entre le domaine et l'infrastructure.