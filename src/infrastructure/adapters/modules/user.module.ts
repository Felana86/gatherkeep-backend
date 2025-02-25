import { Module } from '@nestjs/common';
import { UserRepositoryPrisma } from '../persistence/user-repository.prisma';
import { PrismaService } from '../../config/prisma.service';

@Module(
  {
    imports: [UserRepositoryPrisma, PrismaService],
    providers: [UserRepositoryPrisma],
  }
)
export class UserModule {}