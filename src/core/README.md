# SRC/CORE
Le dossier Core contient les entités métier et le sinterfaces:

- Les entités métier vont représenter les modèles Prisma, 
mais sous forme domaine, sans dépendance à Prisma. Le sentités sont le business models
- Les interfaces des repositories permet d'abstraire l'accès à la base de données.
- Les uses-cases représentent les cas d'utilisation. C'est-à-dire, les services métier de l'application.