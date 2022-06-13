import { StudentTypes } from './../student/student.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Lesson')
export class LessonType {
  @Field({ nullable: true })
  _id?: string;
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field((type) => [StudentTypes], { defaultValue: [] })
  students?: string[];
}
