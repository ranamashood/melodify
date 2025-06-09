import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './entities/like.entity';
import { Model } from 'mongoose';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async toggleLike(userId: string, songId: string) {
    const isLiked = await this.likeModel.findOne({ userId, songId });

    if (isLiked) {
      await this.likeModel.deleteOne({ userId, songId });
    } else {
      await this.likeModel.create({ userId, songId });
    }

    return { isLiked: !isLiked };
  }

  async findAll(userId: string) {
    const likes = await this.likeModel
      .find({ userId })
      .populate('songId')
      .exec();
    const songs = likes.map((song) => song.songId);

    return songs;
  }

  findOne(userId: string, songId: string) {
    return this.likeModel.findOne({ userId, songId }).exec();
  }
}
