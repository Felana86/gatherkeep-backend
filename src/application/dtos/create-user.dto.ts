import { Role } from '../../domain/entities/role.enum';

export class CreateUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly role?: Role,
  ) {}
}