Les services des adapters permettent de convertir les requètes http en appels aux use-cases.
Ils instancient le srepositories et services externes définis dans "infrastructure", puis rappellent les use cases.

#   POURQUOI?
- Les use cases du core sont appelés proprement.
- Facilite les tests et le remplcament des implémentations.
- Evite toute dépendance directe entr ele core et NestJS