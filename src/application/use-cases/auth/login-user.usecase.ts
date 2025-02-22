import { UserRepository } from '../../../domain/repositories/user.repository';

import * as bcrypt from 'bcrypt';

import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { JwtService } from '../../../infrastructure/services/jwt.service';


export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    ) {}

  async execute(dto: LoginUserDto): Promise<{ accessToken: Promise<string>; refreshToken: Promise<string>; expiresAt: Date }> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.jwtService.generateAccessToken(user);
    const refreshToken = this.jwtService.generateRefreshToken(user);
    const expiresAt = new Date(new Date().getTime() + 70 * 60 * 60 * 1000);

    const actualRefreshToken = await refreshToken;
    const hashedRefreshToken = await bcrypt.hash(actualRefreshToken, 10);
    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken, expiresAt)

    return { accessToken, refreshToken, expiresAt };
  }
}