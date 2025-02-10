import { List } from '../model/list.schema';

export class ListResponseDto extends List {
  totalProducts: number;
  boughtProducts: number;
}
