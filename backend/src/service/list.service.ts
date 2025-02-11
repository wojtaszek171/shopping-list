import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List, ListDocument, UserRole } from '../model/list.schema';
import { Product, ProductDocument } from '../model/product.schema';
import { CreateListDto } from '../dto/create-list.dto';
import { UpdateListDto } from '../dto/update-list.dto';
import { ListResponseDto } from '../dto/list-response.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private listModel: Model<ListDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async getListWithUsers(listId: string): Promise<List | null> {
    return this.listModel.findById(listId).populate('users.user').exec();
  }

  async createList(
    createListDto: CreateListDto,
    userId: string
  ): Promise<List> {
    const createdList = new this.listModel({
      ...createListDto,
      users: [{ user: userId, role: UserRole.OWNER }]
    });
    return createdList.save();
  }

  async editList(
    listId: string,
    updateListDto: UpdateListDto
  ): Promise<List | null> {
    return this.listModel
      .findByIdAndUpdate(listId, updateListDto, { new: true })
      .exec();
  }

  async addOwner(listId: string, ownerId: string): Promise<List | null> {
    return this.listModel
      .findByIdAndUpdate(
        listId,
        { $addToSet: { owners: ownerId } },
        { new: true }
      )
      .exec();
  }

  async removeOwner(listId: string, ownerId: string): Promise<List | null> {
    return this.listModel
      .findByIdAndUpdate(listId, { $pull: { owners: ownerId } }, { new: true })
      .exec();
  }

  async removeList(listId: string): Promise<any> {
    await this.productModel.deleteMany({ list: listId }).exec();
    return this.listModel.findByIdAndDelete(listId).exec();
  }

  async getAllLists(): Promise<ListResponseDto[]> {
    const lists = await this.listModel.find().populate('users.user').exec();
    const listsWithProductCounts = await Promise.all(
      lists.map(async (list) => {
        const totalProducts = await this.productModel
          .countDocuments({ list: list._id })
          .exec();
        const boughtProducts = await this.productModel
          .countDocuments({ list: list._id, bought: true })
          .exec();
        return { ...list.toObject(), totalProducts, boughtProducts };
      })
    );
    return listsWithProductCounts;
  }

  async getOneList(listId: string): Promise<ListResponseDto | null> {
    const list = await this.listModel
      .findById(listId)
      .populate('users.user')
      .exec();
    if (!list) return null;
    const totalProducts = await this.productModel
      .countDocuments({ list: listId })
      .exec();
    const boughtProducts = await this.productModel
      .countDocuments({ list: listId, bought: true })
      .exec();
    return { ...list.toObject(), totalProducts, boughtProducts };
  }
}
