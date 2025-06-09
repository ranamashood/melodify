import { Controller, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { User } from 'src/users/user.decorator';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':songId')
  toggleLike(@User('userId') userId: string, @Param('songId') songId: string) {
    return this.likesService.toggleLike(userId, songId);
  }

  @Get()
  findAll(@User('userId') userId: string) {
    return this.likesService.findAll(userId);
  }

  @Get(':songId')
  findOne(@User('userId') userId: string, @Param('songId') songId: string) {
    return this.likesService.findOne(userId, songId);
  }
}
