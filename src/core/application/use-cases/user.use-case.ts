import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity'
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

export class UserUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    ) {}

  // Register user
  async registerUser(email: string, password: string, firstName?: string, lastName?: string): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    const user = new User(0, email, hashedPassword, firstName, lastName);
    return this.userRepository.create(user)
  }

  // Login user
  async loginUser(email: string, password: string): Promise<String> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new Error('User not found');

    const isPasswordValid = await argon2.verify(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    return this.jwtService.sign({ userId: user.id});
  }

  // Refresh token use case
  async refreshToken(refreshToken: string): Promise<string> {
    const user = await this.userRepository.findById(refreshToken)
    if (!user) throw new Error('User not found');
    if (user.refreshToken !== refreshToken) throw new Error('Invalid refresh token');
    if (user.refreshTokenExpiresAt && user.refreshTokenExpiresAt < new Date()) throw new Error('Refresh token expired');
    return this.jwtService.sign({ userId: user.id });
  }

  // Update user profile use case
  async updateUserProfile(email: string, password: string, firstName?: string, lastName?: string): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');

    user.password = hashedPassword;
    user.firstName = firstName;
    user.lastName = lastName;

    return this.userRepository.update(user.id, user);
  }

  // Delete user use case
  async deleteUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('user not found');

    return this.userRepository.delete(userId);
  }
}