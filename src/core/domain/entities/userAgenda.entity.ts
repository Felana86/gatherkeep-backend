export class UserAgendaEntity {
  constructor(
    public readonly id: number,
    public userId: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ){}
}