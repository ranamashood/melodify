import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Song } from 'src/songs/entities/song.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MusicGateway {
  @SubscribeMessage('play')
  play(@MessageBody() song: Song, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('play', song);
  }

  @SubscribeMessage('pause')
  pause(@ConnectedSocket() client: Socket) {
    client.broadcast.emit('pause');
  }

  @SubscribeMessage('seek')
  seek(@MessageBody() time: string, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('seek', time);
  }
}
