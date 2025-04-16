import { NotificationType, NotificationRefType } from '../notifications.schema';

export class CreateNotificationDto {
  type: NotificationType;
  recipient: string;
  message: string;
  refType: NotificationRefType;
  refId: string;
}
