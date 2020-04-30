import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GameController } from 'game/game.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, UsersController, GameController],
  providers: [AppService, UsersService],
})
export class AppModule {}