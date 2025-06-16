import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayDisconnect,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ClientsService } from './clients.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ClientsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly clientsService: ClientsService) {}

  handleDisconnect(@ConnectedSocket() client: Socket) {
    return this.clientsService.remove(client.id, this.server);
  }

  @SubscribeMessage('createClient')
  create(@MessageBody() username: string, @ConnectedSocket() client: Socket) {
    return this.clientsService.create(username, client, this.server);
  }
}
