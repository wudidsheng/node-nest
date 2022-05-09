import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.log('server run in:http://127.0.0.1:3000/');
  await app.listen(3000);
}
bootstrap();
