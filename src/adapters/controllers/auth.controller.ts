import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../../core/application/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from '../../core/application/use-cases/auth/login-user.usecase';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma-user.repository';
import { CreateUserDto } from '../../core/application/dtos/create-user.dto';
import { LoginUserDto } from '../../core/application/dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(PrismaUserRepository) private readonly userRepository: PrismaUserRepository,
    private readonly registerUserUseCase : RegisterUserUseCase,
    private readonly loginUserUseCase : LoginUserUseCase,
  ) {}

  @Post()
  async register(@Body() dto: CreateUserDto) {
    return this.registerUserUseCase.register(dto);
  }

  @Post()
  async login(@Body() dto: LoginUserDto) {
    return this.loginUserUseCase.login(dto);
  }
}