import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsString } from 'class-validator';
@InputType()
export class LessonInput {
  @MinLength(2)
  @Field()
  name: string;
  @IsString()
  @Field()
  startTime: string;
  @IsString()
  @Field()
  endTime: string;
}
