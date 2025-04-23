import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { ListRepository } from './list.repository';
import { ProductRepository } from '../product/product.repository';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListDocument, UserRole } from './list.schema';
import { WsGateway } from '../ws/ws.gateway';
import { NotificationsRepository } from '../notifications/notifications.repository';
import { UserRepository } from '../user/user.repository'; // Import UserRepository

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly productRepository: ProductRepository,
    private readonly wsGateway: WsGateway, // Inject WebSocket gateway
    private readonly notificationsRepository: NotificationsRepository,
    private readonly userRepository: UserRepository // Inject UserRepository
  ) {}

  async create(listDto: CreateListDto, userId?: string) {
    if (!userId) throw new NotFoundException('User ID is required');
    const list = {
      ...listDto,
      users: [{ user: userId, role: UserRole.OWNER, pending: false }] // Ensure pending is false for the owner
    };
    const createdList = await this.listRepository.create(list);
    return createdList;
  }

  async findAll(userId: string): Promise<ListDocument[]> {
    const lists = await this.listRepository.findAll(userId);
    return Promise.all(
      lists.map(async (list) => {
        const products = await this.productRepository.findByListId(
          list.id as string
        );
        return {
          ...list.toObject(),
          allProductsCount: products.length,
          completedProductsCount: products.filter((p) => p.completed).length
        };
      })
    );
  }

  async findOne(id: string, userId: string): Promise<ListDocument | null> {
    const list = await this.listRepository.findOne(id, userId);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    const products = await this.productRepository.findByListId(
      list.id as string
    );
    return {
      ...list.toObject(),
      allProductsCount: products.length,
      completedProductsCount: products.filter((p) => p.completed).length
    };
  }

  async update(id: string, updateDto: UpdateListDto) {
    const updatedList = await this.listRepository.update(id, updateDto);
    this.wsGateway.emitListUpdated(id);
    return updatedList;
  }

  async delete(id: string) {
    const deletedList = await this.listRepository.delete(id);
    if (deletedList) {
      await this.productRepository.deleteByListId(id);
      this.wsGateway.emitListDeleted(id);
    }
    return deletedList;
  }

  async inviteUserByEmail(listId: string, email: string, ownerId: string) {
    // Check if the user exists
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Find the list
    const list = await this.listRepository.findOne(listId, ownerId);
    if (!list) {
      throw new NotFoundException('List not found');
    }

    // Add the user to the list with pending: false
    const invitedUser = {
      user: user._id.toString(),
      role: UserRole.COLLABORATOR,
      pending: true
    };
    const updatedList = await this.listRepository.addUser(listId, invitedUser);

    if (!updatedList) {
      throw new ConflictException('User is already invited to this list');
    }

    // Create a notification for the invited user
    const message = `You have been invited to collaborate on the list: ${list.name}`;
    await this.notificationsRepository.createInvitationNotification(
      ownerId,
      user._id.toString(),
      listId,
      message
    );

    return { message: 'User invited successfully' };
  }

  async acceptInvitation(listId: string, userId: string) {
    // Find the list
    const list = await this.listRepository.findOnePendingUser(listId, userId);
    if (!list) {
      throw new NotFoundException('No pending invitation found for this user');
    }

    // Update the user's pending status to false
    await this.listRepository.updateUserStatus(listId, userId, {
      pending: false
    });

    // Remove the associated invitation notification
    await this.notificationsRepository.deleteByRefId(listId);

    return { message: 'Invitation accepted successfully' };
  }

  async declineInvitation(listId: string, userId: string) {
    const list = await this.listRepository.findOnePendingUser(listId, userId);

    if (list) {
      // Remove the user from the list
      await this.listRepository.removeUser(listId, userId);
    }

    // Remove the associated invitation notification
    await this.notificationsRepository.deleteByRefId(listId);

    return { message: 'Invitation declined successfully' };
  }
}
