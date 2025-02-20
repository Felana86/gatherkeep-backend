import { Role } from './role.enum'

export class UserEntity {
  constructor(
    public readonly id: number,
    public email: string,
    public password: string,
    public firstName?: string,
    public lastName?: string,
    public role: Role = Role.HABITANT,
    public refreshToken?: string,
    public refreshTokenExpiresAt?: Date,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
