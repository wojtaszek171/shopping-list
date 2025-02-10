import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

export enum Unit {
  PIECE = 'piece',
  KILOGRAM = 'kilogram',
  LITER = 'liter',
  MILLILITER = 'milliliter',
  GRAM = 'gram'
}

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, enum: Unit, default: Unit.PIECE })
  unit: Unit;

  @Prop({ type: Types.ObjectId, ref: 'List', required: true })
  list: Types.ObjectId;

  @Prop({ default: Date.now() })
  addedDate: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
