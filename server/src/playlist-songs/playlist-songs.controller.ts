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
import { User } from 'src/users/user.decorator';

@Controller('playlist-songs')
export class PlaylistSongsController {
  constructor(private readonly playlistSongsService: PlaylistSongsService) {}

  @Post()
  toggleSong(
    @User('userId') userId: string,
    @Body() createPlaylistSongDto: CreatePlaylistSongDto,
  ) {
    createPlaylistSongDto.userId = userId;
    return this.playlistSongsService.toggleSong(createPlaylistSongDto);
  }

  @Get()
  findAll() {
    return this.playlistSongsService.findAll();
  }

  @Get(':playlistId')
  findOne(
    @User('userId') userId: string,
    @Param('playlistId') playlistId: string,
  ) {
    return this.playlistSongsService.findOne(userId, playlistId);
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
