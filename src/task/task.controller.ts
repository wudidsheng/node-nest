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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/decator/custom.decorator';

@Controller('task')
export class TaskController {
  constructor(private taskServer: TaskService) {
    Logger.log('task.controller.ts init ok');
  }
  @Get('/:id')
  getTask(@Param('id') id: string, @User('id') userID: string): CreateTaskDto {
    if (`${id}` === `2`) {
      throw new HttpException('parma is empty', HttpStatus.NOT_FOUND);
    }
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
