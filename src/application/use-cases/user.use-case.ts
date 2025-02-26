import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly userService: UserService,
  ) {}

  async findUserById(id: number): Promise<UserEntity | null> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new UnauthorizedException('Failed to findUserById')
    }
  }

  async findAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.userService.getAllUsers()
      return users as UserEntity[]
    } catch (error) {
      throw new UnauthorizedException('Failed to findAllUsers')
    }
  }

}