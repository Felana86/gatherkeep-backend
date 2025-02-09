export class AdhesionEntity {
  constructor(
    public readonly id: number,
    public userId: number,
    public associationId: number,
    public status: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ){}
}