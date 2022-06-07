import { LessonService } from './lesson.service';
import { Controller, Get } from '@nestjs/common';

@Controller('lesson')
export class LessonController {
  constructor(private lesson: LessonService) {}

  // @Get()
  // create() {
  //   return this.lesson.createLesson();
  // }
  // @Get('/all')
  // findAll() {
  //   return this.lesson.createLesson();
  // }
}
