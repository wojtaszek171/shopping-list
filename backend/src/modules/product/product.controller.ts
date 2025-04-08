import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('lists/:listId/products')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Post()
  async create(
    @Param('listId') listId: string,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productRepository.create({ ...createProductDto, list: listId });
  }

  @Get()
  async findByListId(@Param('listId') listId: string) {
    return this.productRepository.findByListId(listId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productRepository.update(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productRepository.delete(id);
  }
}
