import { Injectable, NotFoundException } from '@nestjs/common';
import { ListRepository } from './list.repository';
import { ProductRepository } from '../product/product.repository';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListDocument, UserRole } from './list.schema';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async create(listDto: CreateListDto, userId?: string) {
    if (!userId) throw new NotFoundException('User ID is required');
    const list = {
      ...listDto,
      users: [{ user: userId, role: UserRole.OWNER }]
    };
    return this.listRepository.create(list);
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
    return this.listRepository.update(id, updateDto);
  }

  async delete(id: string) {
    const list = await this.listRepository.delete(id);
    if (list) {
      await this.productRepository.deleteByListId(id);
    }
    return list;
  }
}
