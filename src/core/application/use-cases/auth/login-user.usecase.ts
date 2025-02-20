import { UserRepository } from '../../../domain/repositories/user.repository';
import { LoginUserDto } from '../../dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../../../../infrastructure/services/jwt.service';


export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    ) {}

  async login(dto: LoginUserDto): Promise<{ accessToken: Promise<string>; refreshToken: Promise<string> }> {
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

    const hashedRefreshToken = await bcrypt.hash(await refreshToken, 10);
    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken)

    return { accessToken, refreshToken };
  }
}