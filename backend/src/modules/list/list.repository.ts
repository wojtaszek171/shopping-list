import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List, ListDocument } from './list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListRepository {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

  async create(todo: CreateListDto): Promise<ListDocument> {
    return new this.listModel(todo).save();
  }

  async findAll(userId: string): Promise<ListDocument[]> {
    return this.listModel
      .find({ users: { $elemMatch: { user: userId, pending: false } } }) // Match userId and pending: false
      .populate('users.user')
      .exec();
  }

  async findOne(id: string, userId: string): Promise<ListDocument | null> {
    return this.listModel
      .findOne({
        _id: id,
        users: { $elemMatch: { user: userId, pending: false } }
      })
      .populate('users.user')
      .exec();
  }

  async findOnePendingUser(
    id: string,
    userId: string
  ): Promise<ListDocument | null> {
    return this.listModel
      .findOne({
        _id: id,
        users: { $elemMatch: { user: userId, pending: true } }
      })
      .populate('users.user')
      .exec();
  }

  async update(
    id: string,
    updateDto: UpdateListDto
  ): Promise<ListDocument | null> {
    return this.listModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .populate('users.user')
      .exec();
  }

  async delete(id: string): Promise<ListDocument | null> {
    return this.listModel.findByIdAndDelete(id).exec();
  }

  async addUser(
    listId: string,
    user: { user: string; role: string; pending?: boolean }
  ): Promise<ListDocument | null> {
    return this.listModel
      .findOneAndUpdate(
        { _id: listId, 'users.user': { $ne: user.user } }, // Ensure the user is not already in the list
        { $push: { users: user } },
        { new: true }
      )
      .populate('users.user')
      .exec();
  }

  async updateUserStatus(
    listId: string,
    userId: string,
    update: { pending?: boolean }
  ): Promise<ListDocument | null> {
    return this.listModel
      .findOneAndUpdate(
        { _id: listId, 'users.user': userId },
        { $set: { 'users.$.pending': update.pending } },
        { new: true }
      )
      .populate('users.user')
      .exec();
  }

  async removeUser(
    listId: string,
    userId: string
  ): Promise<ListDocument | null> {
    return this.listModel
      .findOneAndUpdate(
        { _id: listId },
        { $pull: { users: { user: userId } } },
        { new: true }
      )
      .exec();
  }
}
