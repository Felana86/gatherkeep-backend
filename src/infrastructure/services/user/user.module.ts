import {Module} from "@nestjs/common";
import { UserService } from './user.service';
import { PrismaModule } from '../../persistence/prisma.module';
import { UserController } from '../../controllers/user.controller';
import { PrismaUserRepository } from '../../persistence/prisma-user.repository';

@Module({
    imports: [PrismaModule], // import du module Prisma pour accéder à la BDD
    controllers: [UserController], // met à dispo les endpoints
    providers: [UserService, PrismaUserRepository], // service et repo
    exports: [UserService] // permet l'utilisation du userService dans d'autres modules
})
export class UsersModule {}
