export class PublicationEntity {
  constructor(
    public readonly id: number,
    public content: string,
    public userId?: number,
    public associationId?: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
