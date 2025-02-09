import { UserRepository } from '../repositories/user.repository';
import { User } from '../domain/entities/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

export class UserUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    ) {}

  // Register user
  async registerUser(email: string, password: string, firstName?: string, lastName?: string): Promise<User> {
    const hashPassword = await argon2.hash(password);
    const user = new User(0, email, hashPassword, firstName, lastName);
    return this.userRepository.create(user)
  }

  // Login user
  async loginUser(email: string, password: string, firstName?: string, lastName?: string): Promise<String> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new Error('User not found');

    const isPasswordValid = await argon2.verify(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    return this.jwtService.sign({ userId: user.id});
  }
}