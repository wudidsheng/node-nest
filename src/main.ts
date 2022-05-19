import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TaskInterceptor } from './interceptor/task.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局管道
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TaskInterceptor());
  Logger.log('server run in:http://127.0.0.1:3000/');

  await app.listen(3000);
}
bootstrap();
