import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel) {} // FIXME: itemModel type Model<Item> not working

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find().catch((err) => err.mesage);
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id }).catch((err) => err.mesage);
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel
      .findByIdAndRemove(id)
      .catch((err) => err.mesage);
  }

  async update(dto: CreateItemDto, id: string): Promise<Item> {
    return await this.itemModel
      .findByIdAndUpdate(id, { ...dto }, { new: true })
      .catch((err) => err.mesage);
  }
}
