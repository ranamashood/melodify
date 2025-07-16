import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { SongsModule } from 'src/songs/songs.module';

@Module({
  imports: [SongsModule],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
