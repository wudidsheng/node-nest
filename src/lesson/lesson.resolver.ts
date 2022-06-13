import { StudentService } from './../student/student.service';
import { Lesson } from './entity/lesson.entity';
import { LessonService } from './lesson.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.types';
import { LessonInput } from './lesson.input';

@Resolver((of) => LessonType)
export class LessonReslover {
  constructor(
    private lessonServe: LessonService,
    private studentServe: StudentService,
  ) {}
  @Query((returns) => [LessonType])
  async lesson() {
    const result = await this.lessonServe.findAll();
    return result;
  }
  @Query((returns) => LessonType)
  async findLesson(@Args('id') id: string) {
    const result = await this.lessonServe.findOne(id);
    return result;
  }
  @Mutation((returns) => LessonType)
  async createLesson(@Args('createInput') data: LessonInput) {
    const result = await this.lessonServe.createLesson(data);
    return result;
  }
  @Mutation((returns) => LessonType)
  async assigssn(
    @Args('id') id: string,
    @Args({ name: 'students', type: () => [String] }) students: string[],
  ) {
    const result = await this.lessonServe.assignStudent(id, students);
    return result;
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    const result = await this.studentServe.findManyStudents(
      lesson.students || [],
    );
    return result;
  }
}
