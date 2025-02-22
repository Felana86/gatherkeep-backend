export class AssociationEntity {
  constructor(
    public readonly id: number,
    public name: string,
    public city: string,
    public category: string,
    public description?: string,
    public latitude?: number,
    public longitude?: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
