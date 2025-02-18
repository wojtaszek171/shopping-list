import { Injectable, NotFoundException } from '@nestjs/common';
import { ListRepository } from './list.repository';
import { ProductRepository } from '../product/product.repository';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UserRole } from './list.schema';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async create(listDto: CreateListDto, userId?: string) {
    const list = {
      ...listDto,
      users: [{ user: userId, role: UserRole.OWNER }]
    };
    return this.listRepository.create(list);
  }

  async findAll() {
    const lists = await this.listRepository.findAll();
    return Promise.all(
      lists.map(async (list) => {
        const products = await this.productRepository.findByListId(
          list._id as string
        );
        return {
          ...list.toObject(),
          allProductsCount: products.length,
          completedProductsCount: products.filter((p) => p.completed).length
        };
      })
    );
  }

  async findOne(id: string) {
    if (!id) throw new NotFoundException('List ID is required');
    const list = await this.listRepository.findOne(id);
    if (!list) throw new NotFoundException('List not found');
    const products = await this.productRepository.findByListId(id);
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
    return this.listRepository.delete(id);
  }
}
