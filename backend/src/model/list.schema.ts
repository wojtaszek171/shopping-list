import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ user: { type: Types.ObjectId, ref: 'User' }, role: String }]
  })
  users: { user: Types.ObjectId; role: string }[];

  @Prop({ default: Date.now() })
  createdDate: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);
