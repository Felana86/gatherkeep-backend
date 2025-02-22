export class VoteEntity {
  constructor(
    public readonly id: number,
    public userId: number,
    public sondageId: number,
    public optionIndex: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
