import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import { WsGateway } from '../ws/ws.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  providers: [ProductRepository, WsGateway],
  controllers: [ProductController],
  exports: [ProductRepository]
})
export class ProductModule {}
