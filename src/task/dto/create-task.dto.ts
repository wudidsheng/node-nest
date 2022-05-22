import { IsNotEmpty } from 'class-validator';
/**
 *
 *  @description 数据dto模型
 * @export
 * @class CreateTaskDto
 */
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  description: string;
  status: TaskStatus;
}
/**
 *
 * @description 任务状态枚举定义
 * @export
 * @enum {number}
 */
export enum TaskStatus {
  Doing = 1,
  Done = 2,
}
