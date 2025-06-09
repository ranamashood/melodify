import { Injectable } from '@nestjs/common';
import { CreatePlaylistSongDto } from './dto/create-playlist-song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist-song.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PlaylistSong } from './entities/playlist-song.entity';
import { Model } from 'mongoose';
import { Playlist } from 'src/playlists/entities/playlist.entity';

@Injectable()
export class PlaylistSongsService {
  constructor(
    @InjectModel(PlaylistSong.name)
    private playlistSongModel: Model<PlaylistSong>,
    @InjectModel(Playlist.name)
    private playlistModel: Model<Playlist>,
  ) {}

  async toggleSong(createPlaylistSongDto: CreatePlaylistSongDto) {
    console.log(createPlaylistSongDto);
    const isSongExists = await this.playlistSongModel.findOne(
      createPlaylistSongDto,
    );

    if (isSongExists) {
      await this.playlistSongModel.deleteOne(createPlaylistSongDto);
    } else {
      await this.playlistSongModel.create(createPlaylistSongDto);
    }

    return { isSongExists: !isSongExists };
  }

  findAll() {
    return `This action returns all playlistSongs`;
  }

  async findOne(userId: string, playlistId: string) {
    const playlistSongs = await this.playlistSongModel
      .find({ userId, playlistId })
      .populate('songId')
      .exec();
    const songs = playlistSongs.map((playlistSong) => playlistSong.songId);

    return songs;
  }

  async songExistsInPlaylists(songId: string) {
    const playlistSongs = await this.playlistSongModel.find({ songId }).exec();
    const playlists = await this.playlistModel.find().exec();

    const playlistSongIds = new Set(
      playlistSongs.map((playlistSong) => playlistSong.playlistId.toString()),
    );

    const existsInPlaylists = playlists.map((playlist) =>
      playlistSongIds.has(playlist.id),
    );

    return existsInPlaylists;
  }

  update(id: number, updatePlaylistSongDto: UpdatePlaylistSongDto) {
    return `This action updates a #${id} playlistSong`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlistSong`;
  }
}
