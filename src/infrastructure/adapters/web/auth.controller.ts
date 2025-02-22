import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PrismaUserRepository } from '../../repositories/prisma-user.repository';
import { RegisterUserUseCase } from '../../../application/use-cases/auth/register-user.usecase';
import { LoginUserUseCase } from '../../../application/use-cases/auth/login-user.usecase';
import { CreateUserDto } from '../../../application/dtos/auth/create-user.dto';
import { LoginUserDto } from '../../../application/dtos/auth/login-user.dto';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(PrismaUserRepository) private readonly userRepository: PrismaUserRepository,
    private readonly registerUserUseCase : RegisterUserUseCase,
    private readonly loginUserUseCase : LoginUserUseCase,
  ) {}

  @Post()
  async register(@Body() dto: CreateUserDto) {
    return this.registerUserUseCase.execute(dto);
  }

  @Post()
  async login(@Body() dto: LoginUserDto) {
    return this.loginUserUseCase.execute(dto);
  }
}