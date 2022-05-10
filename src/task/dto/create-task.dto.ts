export class CreateTaskDto {
  id: string;
  name: string;
  description: string;
  status: 'doing' | 'done';
}
