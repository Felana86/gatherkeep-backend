import { UserRepositoryDomain } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { HashService } from '../../domain/services/hash.service';
import { JwtService } from '../../domain/services/jwt.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { BadRequestException } from '@nestjs/common';

export class AuthService {
  constructor(
    private readonly userRepository: UserRepositoryDomain,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await this.hashService.hash(createUserDto.password);
    const user = new UserEntity(
      0,
      createUserDto.email,
      hashedPassword,
      createUserDto.firstName,
      createUserDto.lastName,
    );
    return this.userRepository.create(user);
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    const verifiedPassword = await this.hashService.hash(password);
    if (!user || verifiedPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id }
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }

}