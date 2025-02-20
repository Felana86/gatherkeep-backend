# GESTION DES INTERACTIONS AVEC LES SERVICES EXTERNES

Le dossier infrastructure contient toutes les implémentations techniques
qui interagissent avec des services externes tels que la base de données, 
les services tiers (authentification, paiement, stockage etc..)

IMPORTANT: 
L'infrastructure ne contient aucune logique métier. Elle implémente uniquement les
interfaces dans le core et agit comme un pont entre la logique métier et les systèmes externes.

# POURQUOI CETTE SEPARATION?

- Evite la dépendance du core aux services externes.
- Facilite les tests unitaires et l'évolution du projet.
- Respect de l'architecture hexagonale.