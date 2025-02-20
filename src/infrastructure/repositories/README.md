Le dossier repositories dans infrastructure contient les implémentations
des interfaces définies dans "core/domain/repositories", 
utilisant des technologies comme prisma, Mongoose, Sequelize etc...

Ca permet au core de rester indépendant de prisma.
Possibilité de changer de BDD sans impacter la logique métier.