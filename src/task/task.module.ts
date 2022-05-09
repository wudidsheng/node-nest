import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  // can be injected into constructors if decorated as an @Injectable
  // can be a plain value,a class  ,async/async factory etc
  providers: [TaskService],
})
export class TaskModule {}
