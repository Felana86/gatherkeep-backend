import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto, UserResponseDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

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

  private generateRefreshToken(): string {
    return randomUUID();
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

    const refreshToken = this.generateRefreshToken()

    await this.userService.updateRefreshToken(user.id, refreshToken)

    return { accessToken, refreshToken}
  }
}