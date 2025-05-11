import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  @Prop()
  title: string;

  @Prop()
  artist: string;

  @Prop()
  artists: string[];

  @Prop()
  duration: number;

  @Prop()
  imagePath: string;

  @Prop()
  thumbnailPath: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  birthtimeMs: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);
