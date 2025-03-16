import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async create(productDto: CreateProductDto): Promise<Product> {
    return new this.productModel(productDto).save();
  }

  async findByListId(listId: string): Promise<Product[]> {
    return this.productModel.find({ list: listId }).exec();
  }

  async update(
    id: string,
    updateDto: UpdateProductDto
  ): Promise<Product | null> {
    return this.productModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async deleteByListId(listId: string): Promise<void> {
    await this.productModel.deleteMany({ list: listId }).exec();
  }
}
