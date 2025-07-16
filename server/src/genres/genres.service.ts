import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from 'src/songs/entities/song.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Song.name)
    private songModel: Model<Song>,
  ) {}

  async findAll() {
    const songs = await this.songModel.find().select('genres');
    const genreMap = new Map<string, number>();

    await Promise.all(
      songs.flatMap((song) =>
        song.genres.map(async (genre) => {
          const count = await this.songModel.countDocuments({
            genres: { $in: [genre] },
          });

          genreMap.set(genre, count);
        }),
      ),
    );

    const genres = Array.from(genreMap)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    return genres;
  }

  async findOne(genre: string) {
    const songs = await this.songModel
      .find({ genres: { $in: [genre] } })
      .sort({ mtimeMs: -1 });

    return songs;
  }
}
