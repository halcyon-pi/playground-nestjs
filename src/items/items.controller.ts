import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { Item } from './interfaces/item.interface';

import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  /**
   * Alt use with Req, Res object
   */
  //   findAll(@Req() req: Request, @Res() res: Response): Response {
  //     console.log({ url: req.url });
  //     return res.send('Get all items');
  //   }

  @Get(':id')
  findOne(@Param() param): Promise<Item> {
    // Alt syntax findOne(@Param('id') id)
    return this.itemsService.findOne(param.id);
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
    return this.itemsService.update(updateItemDto, id);
  }
}
