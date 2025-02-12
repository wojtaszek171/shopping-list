import { List } from '../list.schema';

export class ListResponseDto extends List {
  totalProducts: number;
  boughtProducts: number;
}
