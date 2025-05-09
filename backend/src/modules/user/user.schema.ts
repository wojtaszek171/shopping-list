import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullname: string;
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
  @Prop({ required: true, select: false })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
