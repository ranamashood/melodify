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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ClientsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly clientsService: ClientsService) {}

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.clientsService.remove(client.id);
    this.findAllClients();
  }

  @SubscribeMessage('createClient')
  create(@MessageBody() username: string, @ConnectedSocket() client: Socket) {
    this.clientsService.create(username, client);
    this.findAllClients();
  }

  findAllClients() {
    this.server.emit('findAllClients', this.clientsService.findAll());
  }
}
