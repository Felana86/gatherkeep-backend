import { Role } from '../../domain/entities/role.enum';

export class UserDto {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
