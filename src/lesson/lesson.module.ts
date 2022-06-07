import { LessonController } from './lesson.controller';
import { Lesson } from './entity/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LessonReslover } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson], 'mongodb')],
  providers: [LessonService, LessonReslover],
  controllers: [LessonController],
})
export class LessonModule {}
