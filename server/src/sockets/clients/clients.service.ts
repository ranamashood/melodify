import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ClientsService {
  clients = new Map<string, string>();

  create(username: string, client: Socket) {
    this.clients.set(client.id, username);
    this.findAll(client);
  }

  findAll(client: Socket) {
    const clients = Array.from(this.clients.values());
    client.emit('findAllClients', clients);
  }

  remove(id: string, client: Socket) {
    this.clients.delete(id);
    this.findAll(client);
  }
}
