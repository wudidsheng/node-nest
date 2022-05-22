import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { TaskStatus } from '../dto/create-task.dto';
/**
 *
 *
 * @export
 * @class Task
 * @description 数据库模型定义
 */
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
