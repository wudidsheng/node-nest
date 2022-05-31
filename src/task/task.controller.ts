import { ConfigService } from '@nestjs/config';
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
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decator/custom.decorator';
import { User as UserTypes } from '../auth/user.entity';
@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TaskController {
  constructor(
    private taskServer: TaskService,
    private ConfigService: ConfigService,
  ) {
    // 局部使用环境配置
    console.log(this.ConfigService.get('host'));
    Logger.log('task.controller.ts init ok');
  }
  @Get('/all')
  getAllTasks(@Query() filterDto: Partial<CreateTaskDto>): Promise<Task[]> {
    return this.taskServer.getTasks(filterDto);
  }
  @Get('/:id')
  getTask(@Param('id') id: string, @User() user: UserTypes): Promise<Task> {
    return this.taskServer.getTaskByID(id, user);
  }
  @Get()
  getTasks(@User() userInfo: UserTypes): Promise<Task[]> {
    return this.taskServer.getTask(userInfo);
  }

  @Post()
  create(@Body() createTask: CreateTaskDto, @User('id') userid: string) {
    return this.taskServer.createTask(createTask, userid);
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
