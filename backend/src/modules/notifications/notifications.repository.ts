import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotificationRefType,
  Notifications,
  NotificationsDocument,
  NotificationType
} from './notifications.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectModel(Notifications.name)
    private notificationsModel: Model<NotificationsDocument>,
    private readonly wsGateway: WsGateway
  ) {}

  async create(
    notificationsDto: CreateNotificationDto
  ): Promise<Notifications> {
    return new this.notificationsModel(notificationsDto).save();
  }

  async createInvitationNotification(
    senderId: string,
    recipientId: string,
    listId: string,
    message: string
  ): Promise<Notifications> {
    const notification = {
      type: NotificationType.INVITATION,
      sender: senderId,
      recipient: recipientId,
      message,
      refType: NotificationRefType.LIST,
      refId: listId
    };
    return this.create(notification);
  }

  async findByRecipient(recipientId: string): Promise<Notifications[]> {
    return this.notificationsModel
      .find({ recipient: recipientId })
      .populate('sender') // Populate sender
      .populate('recipient') // Populate recipient
      .populate({
        path: 'refId', // Dynamically populate refId based on refType
        populate: { path: '_id' }
      })
      .exec();
  }

  async findByListId(listId: string): Promise<Notifications[]> {
    return this.notificationsModel.find({ list: listId }).exec();
  }

  async update(
    id: string,
    updateDto: UpdateNotificationDto
  ): Promise<Notifications | null> {
    const updatedNotifications = await this.notificationsModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    return updatedNotifications;
  }

  async delete(id: string): Promise<Notifications | null> {
    return this.notificationsModel.findByIdAndDelete(id).exec();
  }

  async deleteByListId(listId: string): Promise<void> {
    await this.notificationsModel.deleteMany({ list: listId }).exec();
  }

  async deleteByRefId(refId: string): Promise<void> {
    await this.notificationsModel.deleteMany({ refId }).exec();
  }

  async readById(id: string): Promise<Notifications | null> {
    return this.notificationsModel
      .findByIdAndUpdate(id, { read: true }, { new: true })
      .exec();
  }
}
