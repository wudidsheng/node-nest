import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  Doing = 1,
  Done = 2,
}
