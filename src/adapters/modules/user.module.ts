import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../../application/services/user.service';
import { UserRepositoryPrisma } from '../../infrastructure/adapters/persistence/user-repository.prisma';
import { USER_REPOSITORY } from '../../domain/repositories/user-repository.token';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
    provide: USER_REPOSITORY,
      useClass: UserRepositoryPrisma,
    },
    UserService,
  ],
  exports: [USER_REPOSITORY],
})

export class UserModule {}