import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { UserService } from '../user/user.service';


@Module({
  imports: [UsersModule],
  providers: [UserService, AuthService],
  exports: [AuthService]
})

export class AuthModule {}