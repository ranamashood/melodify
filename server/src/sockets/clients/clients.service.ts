import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ClientsService {
  clients = new Map<string, string>();

  create(username: string, client: Socket) {
    this.clients.set(client.id, username);
  }

  findAll() {
    return Array.from(this.clients.values());
  }

  remove(id: string) {
    this.clients.delete(id);
  }
}
