import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { AuthService } from '../../application/services/auth.service';
import { LoginRequestDto } from '../dtos/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post()
  async register(@Body() dto: RegisterRequestDto) {
    return this.authService.registerUser(dto);
  }

  @Post()
  async login(@Body() dto: LoginRequestDto) {
    return this.authService.loginUser(dto.email, dto.password);
  }
}