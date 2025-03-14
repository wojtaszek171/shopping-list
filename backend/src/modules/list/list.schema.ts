import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

export type ListDocument = List & Document;

export enum UserRole {
  OWNER = 'owner',
  COLLABORATOR = 'collaborator'
}

@Schema({ timestamps: true })
export class List {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [
      {
        user: { type: Types.ObjectId, ref: 'User' },
        role: { type: String, enum: UserRole }
      }
    ]
  })
  users: { user: Types.ObjectId | User; role: UserRole }[];
}

export const ListSchema = SchemaFactory.createForClass(List);
