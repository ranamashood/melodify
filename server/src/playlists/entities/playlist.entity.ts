import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema()
export class Playlist {
  @Prop({ required: true })
  name: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
