import { Module } from '@nestjs/common';
import { AuthModule } from './adapters/modules/auth.module';
import { UserModule } from './adapters/modules/user.module';
import { PrismaService } from './infrastructure/config/prisma.service';

@Module({
  imports: [AuthModule, UserModule],
  providers: [PrismaService]
})
export class AppModule {}
