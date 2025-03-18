import { Module } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';

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