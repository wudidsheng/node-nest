import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('lessons')
export class Lesson {
  @ObjectIdColumn()
  _id: ObjectID;
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  startTime: string;
  @Column()
  endTime: string;

  @Column()
  students: string[];
}
