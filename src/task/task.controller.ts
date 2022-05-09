import { TaskService } from './task.service';
import { Controller, Get, Logger } from '@nestjs/common';

@Controller('task')
export class TaskController {
  constructor(private taskServer: TaskService) {
    Logger.log('task.controller.ts init ok');
  }

  @Get()
  sayHello() {
    return this.taskServer.hello();
  }
}
