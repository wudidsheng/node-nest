import { MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class studentInput {
  @Field()
  @MinLength(3)
  name: string;
}
