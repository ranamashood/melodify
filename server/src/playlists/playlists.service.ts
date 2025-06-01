import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist } from './entities/playlist.entity';
import { Model } from 'mongoose';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>,
  ) {}

  create(createPlaylistDto: CreatePlaylistDto) {
    const createdPlaylist = new this.playlistModel(createPlaylistDto);
    return createdPlaylist.save();
  }

  findAll() {
    return this.playlistModel.find().exec();
  }

  findOne(id: string) {
    return this.playlistModel.findById(id).exec();
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
