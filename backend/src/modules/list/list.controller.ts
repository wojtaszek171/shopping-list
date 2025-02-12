import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { ListService } from './list.service';
import { List } from './list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListResponseDto } from './dto/list-response.dto';

@Controller('/api/v1/lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get(':id')
  async getList(@Param('id') id: string): Promise<ListResponseDto | null> {
    return this.listService.getOneList(id);
  }

  @Post()
  async createList(
    @Body() createListDto: CreateListDto,
    @Req() req: Request
  ): Promise<List> {
    // const userId = req.user.id; // Assuming user ID is stored in req.user
    return this.listService.createList(createListDto);
  }

  @Put(':id')
  async editList(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto
  ): Promise<List> {
    const updatedList = await this.listService.editList(id, updateListDto);
    if (!updatedList) {
      throw new NotFoundException(`List with id ${id} not found`);
    }
    return updatedList;
  }

  @Put(':id/owner')
  async addOwner(
    @Param('id') id: string,
    @Body('ownerId') ownerId: string
  ): Promise<List> {
    const updatedList = await this.listService.addOwner(id, ownerId);
    if (!updatedList) {
      throw new NotFoundException(`List with id ${id} not found`);
    }
    return updatedList;
  }

  @Delete(':id/owner')
  async removeOwner(
    @Param('id') id: string,
    @Body('ownerId') ownerId: string
  ): Promise<List> {
    const updatedList = await this.listService.removeOwner(id, ownerId);
    if (!updatedList) {
      throw new NotFoundException(`List with id ${id} not found`);
    }
    return updatedList;
  }

  @Delete(':id')
  async removeList(@Param('id') id: string): Promise<any> {
    return this.listService.removeList(id);
  }

  @Get()
  async getAllLists(): Promise<ListResponseDto[]> {
    return this.listService.getAllLists();
  }
}
