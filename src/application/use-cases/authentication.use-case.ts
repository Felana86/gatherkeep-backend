import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto, UserResponseDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<UserResponseDto> {
    try {
      return await this.userService.registerUser(dto);
    } catch (error) {
      throw new BadRequestException('Failed to register user')
    }
  }

  async login(dto: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.loginUser(dto);
    if (!user) {
          throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role
    })
    const refreshToken = this.jwtService.sign({
      sub: user.id,
      expiresAt: '7d'
    })

    return { accessToken, refreshToken}
  }
}