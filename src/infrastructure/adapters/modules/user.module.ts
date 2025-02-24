import { Module } from '@nestjs/common';
import { UserRepositoryPrisma } from '../persistence/prisma-user.repository';
import { PrismaService } from '../../config/prisma.service';

@Module(
  {
    imports: [UserRepositoryPrisma, PrismaService],
    providers: [UserRepositoryPrisma],
  }
)
export class UserModule {}