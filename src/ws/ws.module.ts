import { Module } from '@nestjs/common';
import { WSGateway } from './ws.gateway';
import { GameService } from 'game/game.service';
import { AppModule } from 'app.module';

@Module({
  providers: [WSGateway],
  // imports: [AppModule],
  exports: [WSGateway],
})
export class WsModule {}
