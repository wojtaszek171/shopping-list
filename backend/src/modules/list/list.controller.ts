import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly todoService: ListService) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.todoService.create(createListDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.todoService.update(id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
