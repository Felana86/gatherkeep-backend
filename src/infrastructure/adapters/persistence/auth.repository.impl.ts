import { RegisterUserUseCase } from '../../../application/use-cases/auth/register-user.usecase';
import { CreateUserDto } from '../../../application/dtos/auth/create-user.dto';
import { UserEntity } from '../../../domain/entities/user.entity';
import { LoginUserDto } from '../../../application/dtos/auth/login-user.dto';
import { LoginUserUseCase } from '../../../application/use-cases/auth/login-user.usecase';

export class AuthRepositoryImpl {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    ) {}

  public async registerUser(dto: CreateUserDto): Promise<UserEntity> {
    return await this.registerUserUseCase.execute(dto)
  }

  public async loginUser(dto: LoginUserDto): Promise<{ accessToken: Promise<string>; refreshToken: Promise<string>; expiresAt: Date }> {
    return await this.loginUserUseCase.execute(dto)
  }
}