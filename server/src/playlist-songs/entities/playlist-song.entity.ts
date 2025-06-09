import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type PlaylistSongDocument = HydratedDocument<PlaylistSong>;

@Schema({ timestamps: true })
export class PlaylistSong {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Playlist',
    required: true,
  })
  playlistId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Song', required: true })
  songId: string;
}

export const PlaylistSongSchema = SchemaFactory.createForClass(PlaylistSong);
