export class SondageEntity {
  constructor(
    public readonly id: number,
    public question: string,
    public associationId: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ){}
}