import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema({ timestamps: true })
export class Like {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Song', required: true })
  songId: Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
