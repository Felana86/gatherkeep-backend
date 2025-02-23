import { Body, Controller, Post } from '@nestjs/common';
x
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post()
  async register(@Body() dto: CreateUserDto) {
    return this.authService.execute(dto);
  }

  @Post()
  async login(@Body() dto: LoginUserDto) {
    return this.authService.execute(dto);
  }
}