import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { readdir, stat } from 'node:fs/promises';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './entities/song.entity';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async scanMusicDirectory() {
    const songFilenames = await readdir('public/uploads/songs/');

    const dirSongsSet = new Set(songFilenames);
    const dbSongs = await this.findAll();
    const dbSongsSet = new Set(dbSongs.map((dbFile) => dbFile.filename));

    const addedFiles = songFilenames.filter(
      (songFilename) => !dbSongsSet.has(songFilename),
    );

    addedFiles.forEach(async (addedFile) => {
      const stats = await stat(`public/uploads/songs/${addedFile}`);

      const song = {
        filename: addedFile,
        birthtimeMs: stats.birthtimeMs,
      };

      this.create(song);
    });

    const deletedFiles = dbSongs.filter(
      (dbFile) => !dirSongsSet.has(dbFile.filename),
    );

    deletedFiles.forEach((deletedFile) => this.remove(deletedFile.id));

    return {
      addedCount: addedFiles.length,
      deletedCount: deletedFiles.length,
    };
  }

  create(createSongDto: CreateSongDto) {
    const createdSong = new this.songModel(createSongDto);
    return createdSong.save();
  }

  findAll() {
    return this.songModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} song`;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  async remove(id: string) {
    return this.songModel.findByIdAndDelete(id).exec();
  }
}
