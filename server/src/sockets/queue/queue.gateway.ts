import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { QueueService } from './queue.service';
import { SongDocument } from 'src/songs/entities/song.entity';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class QueueGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly queueService: QueueService) {}

  @SubscribeMessage('addToQueue')
  add(@MessageBody() song: SongDocument) {
    this.queueService.add(song);
    this.get();
  }

  @SubscribeMessage('getQueue')
  get() {
    this.server.emit('getQueue', this.queueService.get());
  }

  @SubscribeMessage('removeFromQueue')
  remove(@MessageBody() songId: string) {
    this.queueService.remove(songId);
    this.get();
  }
}
