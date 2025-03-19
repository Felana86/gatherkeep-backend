import {  Module } from '@nestjs/common';
import { PrismaModule } from '../persistence/prisma.module';
import { PrismaUserRepository } from '../persistence/prisma-user.repository';
import { PrismaService } from '../persistence/prisma.service';
import {IUserRepository } from '../../core/domain/repositories/IUserRepository'
import { UserController } from '../../adapters/controllers/user.controller';
import { UserService } from '../services/user.service';

@Module({
    imports: [ PrismaModule],
    controllers: [UserController], // met à dispo les endpoints
    providers: [UserService,
        {
            provide: IUserRepository,
            useClass: PrismaUserRepository
        },
    PrismaService], // service et repo
    exports: [UserService, IUserRepository] // permet l'utilisation du userService dans d'autres modules
})
export class UserModule {}
