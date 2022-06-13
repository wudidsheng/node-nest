import { Student } from './student.tntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { studentReslover } from './student.reslover';

@Module({
  imports: [TypeOrmModule.forFeature([Student], 'mongodb')],
  providers: [StudentService, studentReslover],
  exports: [StudentService],
})
export class StudentModule {}
