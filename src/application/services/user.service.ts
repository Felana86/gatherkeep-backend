import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryDomain } from '../../domain/repositories/user.repository';
import { LoginUserDto, RegisterUserDto, UserResponseDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../domain/entities/user.entity';
import { USER_REPOSITORY } from '../../domain/repositories/user-repository.token';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly  userRepository: UserRepositoryDomain) {}

  async registerUser(dto: RegisterUserDto): Promise<UserResponseDto> {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10)

      const newUser = await this.userRepository.create(
        new UserEntity(
          Date.now(),
          dto.email,
          hashedPassword,
          dto.firstName,
          dto.lastName
        )
      )
      return this.toResponseDto(newUser)
    } catch (error) {
      throw new Error('Failed to register user');
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findByEmail(email);
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findById(id);
  }

  async getAllUsers() {
    return this.userRepository.findAll()
  }

  async loginUser(dto: LoginUserDto): Promise<UserEntity> {

    const user =await this.getUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const confirmPassword = await bcrypt.compare(dto.password, user.password);
    if (!confirmPassword) {
    throw new UnauthorizedException('Invalid credentials')
    }
    return user;
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('Invalid credentials');

    user.refreshToken = refreshToken;
    await this.userRepository.save(user.id, user);
  }

  private toResponseDto(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  }
}