import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreatePodcastInput {
  @Field(() => String)
  readonly title: string;
  @Field(() => String)
  readonly category: string;
}

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {
  id: number;
}
