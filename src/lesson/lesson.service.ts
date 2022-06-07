import { Student } from './../student/student.tntity';
import { Lesson } from './entity/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson, 'mongodb')
    private readonly lessonDb: Repository<Lesson>,
  ) {}
  async createLesson(data: LessonInput) {
    // 时间戳做id
    const result = this.lessonDb.create({
      ...data,
      id: `${new Date().getTime()}`,
    });
    return await await this.lessonDb.save(result);
  }
  async findAll() {
    return await this.lessonDb.find();
  }
  async findOne(id: string) {
    console.log(id);
    return await this.lessonDb.findOne({ where: { id } });
  }
  async assignStudent(lessonId: string, Student: string[]) {
    const lesson = await this.lessonDb.findOne({ where: { id: lessonId } });
    lesson.students = [...(lesson.students ? lesson.students : []), ...Student];
    return this.lessonDb.save(lesson);
  }
}
