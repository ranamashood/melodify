import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class MusicService {
  play(songId = '', client: Socket) {
    if (!songId) {
      client.broadcast.emit('play');
    } else {
      client.broadcast.emit('play', songId);
    }
  }

  pause(client: Socket) {
    client.broadcast.emit('pause');
  }

  seek(time: string, client: Socket) {
    client.broadcast.emit('seek', time);
  }
}
