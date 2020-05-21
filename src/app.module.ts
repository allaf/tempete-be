import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './users/user.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GameController } from './game/game.controller';
import { WsModule } from './ws/ws.module';
import { GameService } from './game/game.service';
import { DataService } from './data-service/data.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [AuthModule, UsersModule, WsModule, TodoModule],
  controllers: [AppController, UsersController, GameController],
  providers: [AppService, UserService, GameService, DataService],
})
export class AppModule {}
