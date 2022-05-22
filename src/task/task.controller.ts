import { Task } from './databaseDto/task.entity';
import { TaskService } from './task.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskServer: TaskService) {
    Logger.log('task.controller.ts init ok');
  }
  @Get('/all')
  getAllTasks(@Query() filterDto: Partial<CreateTaskDto>): Promise<Task[]> {
    return this.taskServer.getTasks(filterDto);
  }
  @Get('/:id')
  getTask(@Param('id') id: string): Promise<Task> {
    return this.taskServer.getTaskByID(id);
  }
  @Get()
  getTasks(@Query() query: { [x: string]: any }): Promise<Task[]> {
    return this.taskServer.getTask(query);
  }
  @Post()
  create(@Body() createTask: CreateTaskDto) {
    return this.taskServer.createTask(createTask);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<string> {
    return this.taskServer.deleteTask(id);
  }
  @Patch('update/:id')
  updateTask(@Body() body: CreateTaskDto, @Param('id') id: string) {
    return this.taskServer.updateTask(id, body);
  }
}
