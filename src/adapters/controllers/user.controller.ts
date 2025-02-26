import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserUseCases } from '../../application/use-cases/user.use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly userUseCase: UserUseCases
  ) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') id: number): Promise<UserEntity | null> {
    return this.userUseCase.findUserById(id)
  }

  @Get('users')
  async getUsers(): Promise<UserEntity[]> {
    return this.userUseCase.findAllUsers()
  }
}