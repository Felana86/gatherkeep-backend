import { Controller, Get, Param } from '@nestjs/common';
import { UserRepositoryPrisma } from '../persistence/prisma-user.repository';

@Controller('test')
export class TestController {
  constructor(private readonly userRepository: UserRepositoryPrisma) {}

  @Get('email')
  async getUser(@Param('email') email: string) {
    return await this.userRepository.findByEmail(email)
  }
}