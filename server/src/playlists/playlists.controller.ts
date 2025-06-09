import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { User } from 'src/users/user.decorator';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(
    @User('userId') userId: string,
    @Body() createPlaylistDto: CreatePlaylistDto,
  ) {
    createPlaylistDto.userId = userId;
    return this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  findAll(@User('userId') userId: string) {
    return this.playlistsService.findAll(userId);
  }

  @Get(':id')
  findOne(@User('userId') userId: string, @Param('id') id: string) {
    return this.playlistsService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistsService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(+id);
  }
}
