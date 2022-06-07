import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/entity/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.tntity';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
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
    TypeOrmModule.forRoot({
      type: 'mongodb',
      name: 'mongodb',
      url: 'mongodb://root:example@localhost:27018/school?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
      useNewUrlParser: true,
      synchronize: true,
      entities: [Lesson, Student],
    }),
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
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
