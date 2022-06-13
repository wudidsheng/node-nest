import { Student } from './student.tntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { studentInput } from './create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student, 'mongodb')
    private studentDb: Repository<Student>,
  ) {}
  //创建
  async createStudent(student: studentInput) {
    const studentInfo = await this.studentDb.create({
      ...student,
      id: `${new Date().getTime()}`,
    });
    return this.studentDb.save(studentInfo);
  }
  async findAll() {
    return await this.studentDb.find();
  }
  async findById(id: string) {
    return await this.studentDb.findOne({ where: { id } });
  }
  async findManyStudents(ids: string[]) {
    return await this.studentDb.find({
      where: {
        id: {
          // @ts-ignore--next
          $in: ids,
        },
      },
    });
  }
}
