import { UserRepositoryDomain } from '../../../domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../../../infrastructure/services/jwt.service';
import { LoginUserDto } from '../../dtos/login-user.dto';


export class LoginUserUseCase {
  constructor(
    private readonly userRepositoryDomain: UserRepositoryDomain,
    private readonly jwtService: JwtService,
    ) {}

  async execute(dto: LoginUserDto): Promise<{ accessToken: Promise<string>; refreshToken: Promise<string>; expiresAt: Date }> {
    const user = await this.userRepositoryDomain.findByEmail(dto.email);
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
    await this.userRepositoryDomain.updateRefreshToken(user.id, hashedRefreshToken, expiresAt)

    return { accessToken, refreshToken, expiresAt };
  }
}