import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicGateway } from './music.gateway';

@Module({
  providers: [MusicGateway, MusicService],
})
export class MusicModule {}
