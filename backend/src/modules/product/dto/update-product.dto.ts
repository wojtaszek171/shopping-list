import { Unit } from '../product.schema';

export class UpdateProductDto {
  name?: string;
  quantity?: number;
  completed?: boolean;
  unit?: Unit;
  category?: string;
}
