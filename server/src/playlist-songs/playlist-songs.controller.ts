import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistSongsService } from './playlist-songs.service';
import { CreatePlaylistSongDto } from './dto/create-playlist-song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist-song.dto';

@Controller('playlist-songs')
export class PlaylistSongsController {
  constructor(private readonly playlistSongsService: PlaylistSongsService) {}

  @Post()
  toggleSong(@Body() createPlaylistSongDto: CreatePlaylistSongDto) {
    return this.playlistSongsService.toggleSong(createPlaylistSongDto);
  }

  @Get()
  findAll() {
    return this.playlistSongsService.findAll();
  }

  @Get(':playlistId')
  findOne(@Param('playlistId') playlistId: string) {
    return this.playlistSongsService.findOne(playlistId);
  }

  @Get('song-exists/:songId')
  songExistsInPlaylists(@Param('songId') songId: string) {
    return this.playlistSongsService.songExistsInPlaylists(songId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistSongDto: UpdatePlaylistSongDto,
  ) {
    return this.playlistSongsService.update(+id, updatePlaylistSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistSongsService.remove(+id);
  }
}
