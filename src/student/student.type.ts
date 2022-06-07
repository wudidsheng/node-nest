import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('student')
export class StudentTypes {
  @Field({ nullable: true })
  _id?: string;
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;
}
