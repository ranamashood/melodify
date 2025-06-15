import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MusicService } from './music.service';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MusicGateway {
  constructor(private readonly musicService: MusicService) {}

  @SubscribeMessage('play')
  play(@MessageBody() songId: string, @ConnectedSocket() client: Socket) {
    return this.musicService.play(songId, client);
  }

  @SubscribeMessage('pause')
  pause(@ConnectedSocket() client: Socket) {
    return this.musicService.pause(client);
  }

  @SubscribeMessage('seek')
  seek(@MessageBody() time: string, @ConnectedSocket() client: Socket) {
    return this.musicService.seek(time, client);
  }
}
