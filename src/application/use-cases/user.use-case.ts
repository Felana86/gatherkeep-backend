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
      return await this.userService.findUserById(id);
    } catch (error) {
      throw new UnauthorizedException('Failed to findUserById')
    }
  }
}