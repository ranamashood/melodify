import { Injectable } from '@nestjs/common';
import { SongDocument } from 'src/songs/entities/song.entity';

@Injectable()
export class QueueService {
  queue: SongDocument[] = [];

  add(song: SongDocument) {
    this.queue.push(song);
  }

  get() {
    return this.queue;
  }

  remove(songId: string) {
    this.queue = this.queue.filter((song) => song._id.toString() !== songId);
  }
}
