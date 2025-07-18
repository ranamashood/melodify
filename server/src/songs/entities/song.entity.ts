import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SongDocument = HydratedDocument<Song>;

@Schema({ timestamps: true })
export class Song {
  @Prop()
  title: string;

  @Prop()
  artist: string;

  @Prop()
  artists: string[];

  @Prop()
  genres: string[];

  @Prop()
  duration: number;

  @Prop()
  durationFormatted: string;

  @Prop()
  imagePath: string;

  @Prop()
  thumbnailPath: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  mtimeMs: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);
