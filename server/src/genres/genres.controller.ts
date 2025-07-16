import { Controller, Get, Param } from '@nestjs/common';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.genresService.findOne(name);
  }
}
