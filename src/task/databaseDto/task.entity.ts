import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { TaskStatus } from '../dto/create-task.dto';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;
}
