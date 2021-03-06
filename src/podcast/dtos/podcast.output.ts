import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Podcast } from '../entities/podcast.entity';

@ObjectType()
export class PodcastOutput extends CoreOutput {
  @Field(() => Podcast, { nullable: true })
  podcast?: Podcast;
}
@ObjectType()
export class PodcastsOutput extends CoreOutput {
  @Field(() => [Podcast])
  podcasts?: Podcast[];
}
