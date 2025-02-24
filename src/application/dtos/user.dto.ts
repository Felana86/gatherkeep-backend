import { Role } from '../../domain/entities/role.enum';

export class UserDto {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
