import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Episode {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  title: string;
  @Field(() => String)
  category: string;
  @Field(() => Number)
  rating: number;
}
