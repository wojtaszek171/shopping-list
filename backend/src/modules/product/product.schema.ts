import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { List } from '../list/list.schema';

export type ProductDocument = HydratedDocument<Product>;

export enum Unit {
  PIECE = 'piece',
  KILOGRAM = 'kilogram',
  LITER = 'liter',
  MILLILITER = 'milliliter',
  GRAM = 'gram'
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, enum: Unit, default: Unit.PIECE })
  unit: Unit;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Types.ObjectId, ref: List.name, required: true })
  list: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
