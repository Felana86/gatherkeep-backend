export class OptionEntity {
  constructor(
    public readonly id: number,
    public optionName: string,
    public sondageId: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ){}
}