import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List, ListSchema } from './list.schema';
import { ListRepository } from './list.repository';
import { ProductModule } from '../product/product.module';
import { WsGateway } from '../ws/ws.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    ProductModule
  ],
  controllers: [ListController],
  providers: [ListService, ListRepository, WsGateway]
})
export class ListModule {}
