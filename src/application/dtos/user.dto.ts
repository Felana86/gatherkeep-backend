export class RegisterUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}


// Format de sortie pour éviter d'exposer les données sensibles
export class UserResponseDto {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
}