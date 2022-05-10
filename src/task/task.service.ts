import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: CreateTaskDto[];
  constructor() {
    this.tasks = [];
  }
  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return 'delete ok';
  }
  getTaskByID(id: string): CreateTaskDto {
    return this.tasks.find((task) => task.id === id);
  }
  getTask() {
    return this.tasks;
  }
  getTaskByQuery(query: { [x: string]: any }): CreateTaskDto[] {
    console.log(query, '==');
    return this.tasks.sort();
  }
  createTask(body: CreateTaskDto): CreateTaskDto {
    this.tasks.push(body);
    return body;
  }
  updateTask(id: string, body: Partial<CreateTaskDto>) {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks[index] = { ...this.tasks[index], ...body };
    return body;
  }
}
