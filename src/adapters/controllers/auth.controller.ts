import { Body, Controller,Post } from '@nestjs/common';
import { AuthenticationUseCase } from '../../application/use-cases/authentication.use-case';
import { LoginUserDto, RegisterUserDto, UserResponseDto } from '../../application/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUseCase: AuthenticationUseCase,

  ) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto): Promise<UserResponseDto> {
    return this.authUseCase.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authUseCase.login(dto);
  }

}