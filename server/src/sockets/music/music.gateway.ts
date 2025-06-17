import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MusicGateway {
  @SubscribeMessage('play')
  play(@MessageBody() songId: string, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('play', songId);
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
