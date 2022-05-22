import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './databaseDto/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: CreateTaskDto[];
  constructor(
    @InjectRepository(Task)
    private taskDto: Repository<Task>,
  ) {
    this.tasks = [];
  }
  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return 'delete ok';
  }
  getTaskByID(id: string): CreateTaskDto {
    const result = this.tasks.find((task) => task.id === id);
    if (!result) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
    return result;
  }
  async getTask(): Promise<Task[]> {
    return this.taskDto.find();
  }
  getTaskByQuery(query: { [x: string]: any }): CreateTaskDto[] {
    console.log(query, '==');
    return this.tasks.sort();
  }

  async createTask(body: CreateTaskDto): Promise<Task> {
    const { title, description, status } = body;
    const task = this.taskDto.create({
      title,
      description,
      status,
    });
    return await this.taskDto.save(task);
  }
  updateTask(id: string, body: Partial<CreateTaskDto>) {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks[index] = { ...this.tasks[index], ...body };
    return body;
  }
}
