import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class ClientsService {
  clients = new Map<string, string>();

  create(username: string, client: Socket, server: Server) {
    this.clients.set(client.id, username);
    this.findAll(server);
  }

  findAll(server: Server) {
    const clients = Array.from(this.clients.values());
    server.emit('findAllClients', clients);
  }

  remove(id: string, server: Server) {
    this.clients.delete(id);
    this.findAll(server);
  }
}
