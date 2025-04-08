import { Injectable, NotFoundException } from '@nestjs/common';
import { ListRepository } from './list.repository';
import { ProductRepository } from '../product/product.repository';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListDocument, UserRole } from './list.schema';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly productRepository: ProductRepository,
    private readonly wsGateway: WsGateway // Inject WebSocket gateway
  ) {}

  async create(listDto: CreateListDto, userId?: string) {
    if (!userId) throw new NotFoundException('User ID is required');
    const list = {
      ...listDto,
      users: [{ user: userId, role: UserRole.OWNER }]
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
}
