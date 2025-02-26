import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { AuthenticationUseCase } from '../../application/use-cases/authentication.use-case';
import { UserRepositoryPrisma } from '../../infrastructure/adapters/persistence/user-repository.prisma';
import { PrismaService } from '../../infrastructure/config/prisma.service';
import { UserService } from '../../application/services/user.service';
import { USER_REPOSITORY } from '../../domain/repositories/user-repository.token';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION }
    })
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryPrisma,
    },
    UserService,
    AuthenticationUseCase,
    JwtService,
    UserRepositoryPrisma,
    PrismaService,
    //BcryptService
  ],
  exports: [AuthenticationUseCase, USER_REPOSITORY]
})
export class AuthModule {}