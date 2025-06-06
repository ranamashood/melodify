import { Module } from '@nestjs/common';
import { PlaylistSongsService } from './playlist-songs.service';
import { PlaylistSongsController } from './playlist-songs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PlaylistSong,
  PlaylistSongSchema,
} from './entities/playlist-song.entity';
import { PlaylistsModule } from 'src/playlists/playlists.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlaylistSong.name, schema: PlaylistSongSchema },
    ]),
    PlaylistsModule,
  ],
  controllers: [PlaylistSongsController],
  providers: [PlaylistSongsService],
})
export class PlaylistSongsModule {}
