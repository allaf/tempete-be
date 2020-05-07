import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GameController } from 'game/game.controller';
import { ChatModule } from './chat/chat.module';
import { GameService } from 'game/game.service';
import { DataService } from './data-service/data.service';

@Module({
  imports: [AuthModule, UsersModule, ChatModule],
  controllers: [AppController, UsersController, GameController],
  providers: [AppService, UsersService, GameService, DataService],
})
export class AppModule {}
