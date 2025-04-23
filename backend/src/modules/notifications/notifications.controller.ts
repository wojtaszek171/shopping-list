import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req
} from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  @Post()
  async create(@Body() createNotificationsDto: CreateNotificationDto) {
    return this.notificationsRepository.create(createNotificationsDto);
  }

  @Get(':recipientId')
  async findByRecipient(@Param('recipientId') recipientId: string) {
    return this.notificationsRepository.findByRecipient(recipientId);
  }

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.userId; // Assuming `userId` is available in the request object
    return this.notificationsRepository.findByRecipient(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationsDto: UpdateNotificationDto
  ) {
    return this.notificationsRepository.update(id, updateNotificationsDto);
  }

  @Put(':id/read')
  async readById(@Param('id') id: string) {
    return this.notificationsRepository.readById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notificationsRepository.delete(id);
  }
}
