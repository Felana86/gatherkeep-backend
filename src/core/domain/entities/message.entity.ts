export class MessageEntity {
  constructor(
    public readonly id: number,
    public content: string,
    public senderId: number,
    public receiverId: number,
    public associationId?: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
