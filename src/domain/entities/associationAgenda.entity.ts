export class AssociationAgendaEntity {
  constructor(
    public readonly id: number,
    public associationId: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ){}
}