export class CommentEntity {
  constructor(
    public readonly id: number,
    public content: string,
    public userId: number,
    public publicationId: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ){}
}