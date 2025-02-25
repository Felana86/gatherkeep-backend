import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { AuthenticationUseCase } from '../../application/use-cases/authentication.use-case';
import { LoginUserDto, RegisterUserDto, UserResponseDto } from '../../application/dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserUseCases } from '../../application/use-cases/user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authUseCase: AuthenticationUseCase,
    private readonly userUseCase: UserUseCases
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto): Promise<UserResponseDto> {
    return this.authUseCase.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authUseCase.login(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: number): Promise<UserEntity | null> {
    return this.userUseCase.findUserById(id)
  }
}