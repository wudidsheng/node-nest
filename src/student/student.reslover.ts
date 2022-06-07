import { StudentService } from './student.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { studentInput } from './create-student.input';
import { StudentTypes } from './student.type';

@Resolver((of) => StudentTypes)
export class studentReslover {
  constructor(private service: StudentService) {}
  @Mutation((returns) => StudentTypes)
  createStudent(@Args('student') student: studentInput) {
    return this.service.createStudent(student);
  }
  @Query((type) => [StudentTypes])
  findAllStudent() {
    return this.service.findAll();
  }
  @Query((type) => StudentTypes)
  findStudentById(@Args('id') id: string) {
    return this.service.findById(id);
  }
}
