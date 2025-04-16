export class UpdateListDto {
  readonly name?: string;
  readonly description?: string;
  readonly users?: { user: string; role: string; pending?: boolean }[]; // Allow updating users
}
