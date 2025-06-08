import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  Req,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { UpdateSongDto } from './dto/update-song.dto';
import { Request, Response } from 'express';
import { Public } from 'src/utils/constants';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post('scan-directory')
  @HttpCode(HttpStatus.CREATED)
  async scanMusicDirectory() {
    return this.songsService.scanMusicDirectory();
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Public()
  @Get(':id/stream')
  streamSong(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.songsService.streamSong(id, req, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
