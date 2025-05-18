import { Controller, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':songId')
  toggleLike(@Param('songId') songId: string) {
    return this.likesService.toggleLike(songId);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':songId')
  findOne(@Param('songId') songId: string) {
    return this.likesService.findOne(songId);
  }
}
