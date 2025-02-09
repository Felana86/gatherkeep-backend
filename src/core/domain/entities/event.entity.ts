export class EventEntity {
  constructor(
    public readonly id: number,
    public title: string,
    public description: number,
    public date: Date,
    public location: string,
    public isPublic: boolean = true,
    public status: string = "PLANNED",
    public maxAttendees?: number,
    public latitude?: number,
    public longitude?: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ){}
}