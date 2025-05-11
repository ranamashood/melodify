import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { readdir, stat } from 'node:fs/promises';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './entities/song.entity';
import { createReadStream } from 'node:fs';
import { Request, Response } from 'express';

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

  findOne(id: string) {
    return this.songModel.findById(id).exec();
  }

  async streamSong(id: string, req: Request, res: Response) {
    const song = await this.findOne(id);

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    const filePath = `public/uploads/songs/${song.filename}`;
    const stats = await stat(filePath);
    const size = stats.size;

    const range = req.headers.range;

    if (!range) {
      res.writeHead(200, {
        'Content-Length': size,
        'Content-Type': 'audio/mpeg',
      });

      return createReadStream(filePath).pipe(res);
    }

    const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr);
    const end = endStr ? parseInt(endStr) : size - 1;

    if (start >= size) {
      res.status(416).set('Content-Range', `bytes */${size}`).end();
      return;
    }

    const chunkSize = end - start + 1;
    const file = createReadStream(filePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'audio/mpeg',
    });

    return file.pipe(res);
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  async remove(id: string) {
    return this.songModel.findByIdAndDelete(id).exec();
  }
}
