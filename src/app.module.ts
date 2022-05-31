import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STAGE: Joi.string().required().default('dev'),
        type: Joi.string().required().default('postgres'),
        host: Joi.string().required().default('localhost'),
        port: Joi.string().required().default(5432),
        username: Joi.string().required(),
        password: Joi.string().required(),
        autoLoadEntities: Joi.boolean().required(),
        synchronize: Joi.boolean().required(),
      }),
      envFilePath: `.env.${process.env.STAGE}.env`,
    }),
    TaskModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get('type') as any,
          host: configService.get('host'),
          port: Number(configService.get('port')),
          username: configService.get('username'),
          password: configService.get('password'),
          autoLoadEntities: Boolean(configService.get('autoLoadEntities')),
          synchronize: Boolean(configService.get('synchronize')),
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
