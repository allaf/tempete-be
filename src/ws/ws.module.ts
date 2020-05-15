import { Module } from '@nestjs/common';
import { WSGateway } from './ws.gateway';

@Module({
  providers: [WSGateway],
  exports: [WSGateway],
})
export class WsModule {}
