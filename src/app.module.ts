import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/persistence/prisma.module';
import { UsersModule } from './infrastructure/services/user/user.module';
import { AuthModule } from './infrastructure/services/auth/auth.module';

@Module({
    imports: [UsersModule, AuthModule, PrismaModule]
})
export class AppModule {}