export class CreateListDto {
  readonly name: string;
  readonly description?: string;
  readonly owners: string[];
}
