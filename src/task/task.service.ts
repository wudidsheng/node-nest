import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserTypes } from 'src/auth/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from './databaseDto/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(UserTypes)
    private userDto: Repository<UserTypes>,
    @InjectRepository(Task)
    private taskDto: Repository<Task>,
  ) {}
  async deleteTask(id: string): Promise<string> {
    const deleteResult: DeleteResult = await this.taskDto.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`task ${id} Not found`);
    }
    return `删除 ${id} 成功`;
  }
  async getTasks(filter: Partial<CreateTaskDto>): Promise<Task[]> {
    const { status, title } = filter;
    const query = this.taskDto.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status=:status', { status });
    }
    if (title) {
      query.andWhere('LOWER(task.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }
    return query.getMany();
  }
  async getTaskByID(id: string, user: UserTypes): Promise<Task> {
    return await this.taskDto.findOne({ where: { id: id, user } });
  }
  async getTask(user: UserTypes): Promise<Task[]> {
    return this.taskDto.find({ where: { user } });
  }

  async createTask(body: CreateTaskDto, userId: string): Promise<Task> {
    const { title, description, status } = body;
    const userInfo = await this.userDto.findOne({ where: { id: userId } });
    const task = this.taskDto.create({
      title,
      description,
      status,
      user: userInfo,
    });
    return await this.taskDto.save(task);
  }
  async updateTask(id: string, body: Partial<Task>): Promise<string> {
    const result: UpdateResult = await this.taskDto.update(id, body);
    if (result.affected === 0) {
      throw new HttpException('数据更新失败', 401);
    }
    return '数据更新成功';
  }
}
