import { Injectable, NotFoundException } from '@nestjs/common';
import { ListRepository } from './list.repository';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(private readonly todoRepository: ListRepository) {}

  async create(todoDto: CreateListDto) {
    return this.todoRepository.create(todoDto);
  }

  async findAll() {
    return this.todoRepository.findAll();
  }

  async findOne(id: string) {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) throw new NotFoundException('List not found');
    return todo;
  }

  async update(id: string, updateDto: UpdateListDto) {
    return this.todoRepository.update(id, updateDto);
  }

  async delete(id: string) {
    return this.todoRepository.delete(id);
  }
}
