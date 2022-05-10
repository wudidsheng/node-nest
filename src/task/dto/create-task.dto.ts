import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  description: string;
  status: 'doing' | 'done';
}
