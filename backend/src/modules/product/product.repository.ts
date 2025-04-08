import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { WsGateway } from '../ws/ws.gateway';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly wsGateway: WsGateway
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
    const updatedList = await this.productModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (updatedList?.list) {
      this.wsGateway.emitListProductsUpdated(updatedList.list.toString());
    }

    return updatedList;
  }

  async delete(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async deleteByListId(listId: string): Promise<void> {
    await this.productModel.deleteMany({ list: listId }).exec();
  }
}
