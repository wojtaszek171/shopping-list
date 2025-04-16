import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notifications, NotificationsSchema } from './notifications.schema';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsController } from './notifications.controller';
import { WsGateway } from '../ws/ws.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notifications.name, schema: NotificationsSchema }
    ])
  ],
  providers: [NotificationsRepository, WsGateway],
  controllers: [NotificationsController],
  exports: [NotificationsRepository]
})
export class NotificationsModule {}
