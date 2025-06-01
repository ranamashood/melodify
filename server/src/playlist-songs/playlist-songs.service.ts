import { Injectable } from '@nestjs/common';
import { CreatePlaylistSongDto } from './dto/create-playlist-song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist-song.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PlaylistSong } from './entities/playlist-song.entity';
import { Model } from 'mongoose';

@Injectable()
export class PlaylistSongsService {
  constructor(
    @InjectModel(PlaylistSong.name)
    private playlistSongModel: Model<PlaylistSong>,
  ) {}

  create(createPlaylistSongDto: CreatePlaylistSongDto) {
    const createdPlaylistSong = new this.playlistSongModel(
      createPlaylistSongDto,
    );
    return createdPlaylistSong.save();
  }

  findAll() {
    return `This action returns all playlistSongs`;
  }

  async findOne(playlistId: string) {
    const playlistSongs = await this.playlistSongModel
      .find({ playlistId })
      .populate('songId')
      .exec();
    const songs = playlistSongs.map((playlistSong) => playlistSong.songId);

    return songs;
  }

  update(id: number, updatePlaylistSongDto: UpdatePlaylistSongDto) {
    return `This action updates a #${id} playlistSong`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlistSong`;
  }
}
