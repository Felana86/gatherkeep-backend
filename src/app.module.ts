import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/persistence/prisma.module';
import { UserModule } from './infrastructure/modules/user.module';
import { AuthModule } from './infrastructure/modules/auth.module';


@Module({
    imports: [UserModule, AuthModule, PrismaModule],

})
export class AppModule {}