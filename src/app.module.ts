import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtConfigService } from './infrastructure/config/jwt.config';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, JwtConfigService],
  exports: [JwtConfigService],
})
export class AppModule {}
