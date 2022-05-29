import { Exclude } from 'class-transformer';
import { use } from 'passport';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @ManyToOne((_type) => User, (user) => user.task, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
