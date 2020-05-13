import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Game } from 'model/game.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Server } from 'ws';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class WSGateway {
  private readonly logger = new Logger(WSGateway.name);

  gameChangeSubject = new BehaviorSubject<Game>(null);

  @WebSocketServer()
  private server: Server;

  constructor() {}

  emit(channel, msg) {
    this.server.emit(channel, msg);
  }

  @SubscribeMessage('gameChange')
  game(@MessageBody() data: any) {
    this.gameChangeSubject.next(data);
  }

  getGameChange(): Observable<Game> {
    return this.gameChangeSubject.asObservable();
  }

  handleConnection(socket: SocketIO.Socket) {
    this.logger.verbose('client'+ socket.client.id+ 'connected');
  }

  handleDisconnect(socket: SocketIO.Socket) {
    this.logger.verbose('client'+ socket.client.id+ 'disconnected');
  }

}
