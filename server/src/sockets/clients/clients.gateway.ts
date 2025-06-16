import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { ClientsService } from './clients.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ClientsGateway implements OnGatewayDisconnect {
  constructor(private readonly clientsService: ClientsService) {}

  handleDisconnect(@ConnectedSocket() client: Socket) {
    return this.clientsService.remove(client.id, client);
  }

  @SubscribeMessage('createClient')
  create(@MessageBody() username: string, @ConnectedSocket() client: Socket) {
    return this.clientsService.create(username, client);
  }
}
