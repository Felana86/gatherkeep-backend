import { Module } from '@nestjs/common';

import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../../adapters/controllers/auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    })],
  providers: [AuthService],
  controllers: [AuthController],
})

export class AuthModule {}