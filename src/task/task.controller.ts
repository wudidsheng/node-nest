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
  @Get('/:id')
  getTask(@Param('id') id: string): CreateTaskDto {
    return this.taskServer.getTaskByID(id);
  }
  @Get()
  getTasks(@Query() query: { [x: string]: any }): CreateTaskDto[] {
    if (Object.keys(query).length) {
      return this.taskServer.getTaskByQuery(query);
    }
    return this.taskServer.getTask();
  }
  @Post()
  create(@Body() createTask: CreateTaskDto) {
    return this.taskServer.createTask(createTask);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskServer.deleteTask(id);
  }
  @Patch('update/:id')
  updateTask(@Body() body: CreateTaskDto, @Param('id') id: string) {
    return this.taskServer.updateTask(id, body);
  }
}
