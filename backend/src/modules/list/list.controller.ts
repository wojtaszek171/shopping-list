import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Req,
  ForbiddenException
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() createListDto: CreateListDto, @Req() req) {
    return this.listService.create(createListDto, req.user.userId);
  }

  @Get()
  findAll(@Req() req) {
    return this.listService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const list = await this.listService.findOne(id, req.user.userId);
    if (!list) {
      throw new ForbiddenException('You do not have access to this list');
    }
    return list;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
    @Req() req
  ) {
    const list = await this.listService.findOne(id, req.user.userId);
    if (!list) {
      throw new ForbiddenException('You do not have access to this list');
    }
    return this.listService.update(id, updateListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const list = await this.listService.findOne(id, req.user.userId);
    if (!list) {
      throw new ForbiddenException('You do not have access to this list');
    }
    return this.listService.delete(id);
  }
}
