import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.11.112',
      port: 32000,
      username: 'root',
      password: 'introcks1234',
      database: 'test',
      entities: [],
    }),
  ],
})
export class AppModule {}
