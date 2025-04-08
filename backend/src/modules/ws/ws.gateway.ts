// ws.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'https://localhost:5173', // Ensure this matches your frontend URL
    credentials: true
  }
})
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(WsGateway.name);

  afterInit(server: Server) {
    this.server = server;
    this.logger.log('WebSocket initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('connected', { message: 'WebSocket connection established' });

    client.on('joinList', (listId: string) => {
      client.join(listId);
      this.logger.log(`Client ${client.id} joined list room: ${listId}`);
    });

    client.on('leaveList', (listId: string) => {
      client.leave(listId);
      this.logger.log(`Client ${client.id} left list room: ${listId}`);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  emitListUpdated() {
    this.logger.log(`List updated`);

    this.server.emit('listUpdated');
  }

  emitListDeleted() {
    this.server.emit('listDeleted');
  }
}
