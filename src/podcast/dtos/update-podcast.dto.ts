import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Episode } from '../entities/episode.entity';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class UpdatePodcastInput extends PartialType(OmitType(Podcast, ['id'])) {
  // @Field(() => String)
  // readonly title?: string;
  // @Field(() => String)
  // readonly category?: string;
  // @Field(() => Number)
  // readonly rating?: number;
  // @Field(() => [Episode])
  // readonly episodes?: Episode[];
}

@ObjectType()
export class UpdatePodcastOutput extends CoreOutput {}
