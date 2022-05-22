import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from './databaseDto/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskDto: Repository<Task>,
  ) {}
  async deleteTask(id: string): Promise<DeleteResult> {
    return this.taskDto.delete(id);
  }
  getTaskByID(id: string): Promise<Task> {
    return this.taskDto.findOne({ where: { id: id } });
  }
  async getTask(query?: Partial<CreateTaskDto>): Promise<Task[]> {
    return this.taskDto.find({ where: query });
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
  async updateTask(id: string, body: Partial<Task>): Promise<UpdateResult> {
    return this.taskDto.update(id, body);
  }
}
