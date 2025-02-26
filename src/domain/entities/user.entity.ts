import { Role } from './role.enum'

export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly password: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly role: Role = Role.HABITANT,
    public refreshToken?: string | null,
    public  refreshTokenExpiresAt?: Date | null,
  ) {}
}
