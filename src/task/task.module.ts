import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './../auth/auth.module';
import { Task } from './databaseDto/task.entity';
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TaskController],
  // can be injected into constructors if decorated as an @Injectable
  // can be a plain value,a class  ,async/async factory etc
  providers: [
    TaskService,
    {
      provide: APP_INTERCEPTOR,
      useValue: ['1232131'],
    },
  ],
})
export class TaskModule {}
