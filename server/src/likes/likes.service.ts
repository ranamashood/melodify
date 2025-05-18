import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './entities/like.entity';
import { Model } from 'mongoose';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async toggleLike(songId: string) {
    const isLiked = await this.likeModel.findOne({ songId });

    if (isLiked) {
      await this.likeModel.deleteOne({ songId });
    } else {
      await this.likeModel.create({ songId });
    }

    return { isLiked: !isLiked };
  }

  async findAll() {
    const likes = await this.likeModel.find().populate('songId').exec();
    const songs = likes.map((song) => song.songId);

    return songs;
  }

  findOne(songId: string) {
    return this.likeModel.findOne({ songId }).exec();
  }
}
