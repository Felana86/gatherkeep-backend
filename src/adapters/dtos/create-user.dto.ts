import { Role } from '../../domain/entities/role.enum';

export class CreateUserDto {
    email: string;
    password: string;
    confirmPassword: string;
    firstName?: string;
    lastName?: string;
    role?: Role; // Optionnel, car souvent attribué par défaut
}
