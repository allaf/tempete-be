import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  private server: Server;

  users = 0;

  async handleConnection() {
    // A client has connected
    this.users++;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    // A client has disconnected
    this.users--;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  afterInit(server: any) {
    console.log(':::::::::::: ChatGateway init ::::::::::::');
  }

  // socketio
  @SubscribeMessage('events')
  toto(@MessageBody() data: any) {
    console.log("Serveur a reçu 'events' en socketio : ", data);
  }
}
