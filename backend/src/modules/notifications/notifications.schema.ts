import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../user/user.schema';

export type NotificationsDocument = HydratedDocument<Notifications>;

export enum NotificationType {
  MESSAGE = 'message',
  INVITATION = 'invitation'
}

export enum NotificationRefType {
  LIST = 'List'
}

@Schema({ timestamps: true })
export class Notifications {
  @Prop({ enum: NotificationType, default: NotificationType.MESSAGE })
  type: NotificationType;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId | User;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recipient: Types.ObjectId | User;

  @Prop({ default: false })
  read: boolean;

  @Prop()
  message: string;

  @Prop({ type: Types.ObjectId, refPath: 'refType', required: true }) // Use refPath for dynamic references
  refId: Types.ObjectId;

  @Prop({ enum: NotificationRefType, required: true })
  refType: NotificationRefType;
}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications);
