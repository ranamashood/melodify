import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { readdir, stat } from 'node:fs/promises';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './entities/song.entity';
import { createReadStream } from 'node:fs';
import { Request, Response } from 'express';
import { parseFile, selectCover } from 'music-metadata';
import * as sharp from 'sharp';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async scanMusicDirectory() {
    const dirents = await readdir('/home/mashood/Music/', {
      withFileTypes: true,
    });
    const songFilenames = dirents
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);

    const dirSongsSet = new Set(songFilenames);
    const dbSongs = await this.findAll();
    const dbSongsSet = new Set(dbSongs.map((dbFile) => dbFile.filename));

    const addedFiles = songFilenames.filter(
      (songFilename) => !dbSongsSet.has(songFilename),
    );

    addedFiles.forEach((addedFile) => this.create(addedFile));

    const deletedFiles = dbSongs.filter(
      (dbFile) => !dirSongsSet.has(dbFile.filename),
    );

    deletedFiles.forEach((deletedFile) => this.remove(deletedFile.id));

    return {
      addedCount: addedFiles.length,
      deletedCount: deletedFiles.length,
    };
  }

  async create(filename: string) {
    const stats = await stat(`/home/mashood/Music/${filename}`);

    const { mtimeMs } = stats;

    const metadata = await parseFile(`/home/mashood/Music/${filename}`);

    const { title, artist, artists, picture, genre: genres } = metadata.common;
    const duration = Math.floor(metadata.format.duration || 0);

    const coverImage = selectCover(picture);
    let imagePath: string | undefined;
    let thumbnailPath: string | undefined;

    if (coverImage) {
      const filePath: string =
        filename.substring(0, filename.lastIndexOf('.')) || filename;

      const imageBuffer: Buffer = Buffer.from(coverImage.data);
      const imageFormat: string = coverImage.format.split('/')[1];

      imagePath = `public/uploads/images/${filePath}.${imageFormat}`;
      thumbnailPath = `public/uploads/images/${filePath}_thumbnail.${imageFormat}`;

      sharp(imageBuffer).toFile(imagePath);
      sharp(imageBuffer).resize(32, 32).toFile(thumbnailPath);

      imagePath = `${filePath}.${imageFormat}`;
      thumbnailPath = `${filePath}_thumbnail.${imageFormat}`;
    }

    const secToMin = (totalSeconds: number): string => {
      const minutes: number = Math.floor(totalSeconds / 60);
      const seconds: number = totalSeconds % 60;
      const secondsStr: string =
        seconds < 10 ? `0${seconds}` : seconds.toString();

      return `${minutes}:${secondsStr}`;
    };

    const durationFormatted = secToMin(duration);

    const song: CreateSongDto = {
      title,
      artist,
      artists,
      genres,
      duration,
      durationFormatted,
      imagePath,
      thumbnailPath,
      filename,
      mtimeMs,
    };

    const createdSong = new this.songModel(song);
    return createdSong.save();
  }

  findAll() {
    return this.songModel.find().sort({ mtimeMs: -1 }).exec();
  }

  findOne(id: string) {
    return this.songModel.findById(id).exec();
  }

  async streamSong(id: string, req: Request, res: Response) {
    const song = await this.findOne(id);

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    const filePath = `/home/mashood/Music/${song.filename}`;
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
