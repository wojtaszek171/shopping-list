import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List, ListDocument } from './list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListRepository {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

  async create(todo: CreateListDto): Promise<List> {
    return new this.listModel(todo).save();
  }

  async findAll(): Promise<List[]> {
    return this.listModel.find().exec();
  }

  async findOne(id: string): Promise<List | null> {
    return this.listModel.findById(id).exec();
  }

  async update(id: string, updateDto: UpdateListDto): Promise<List | null> {
    return this.listModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<List | null> {
    return this.listModel.findByIdAndDelete(id).exec();
  }
}
