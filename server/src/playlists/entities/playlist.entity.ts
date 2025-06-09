import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema()
export class Playlist {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: string;

  @Prop({ required: true })
  name: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
