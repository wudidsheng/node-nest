import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Student {
  @ObjectIdColumn()
  _id: ObjectID;
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
}
