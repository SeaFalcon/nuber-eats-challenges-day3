import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreatePodcastInput } from './create-podcast.dto';

@InputType()
export class CreateEpisodeInput extends CreatePodcastInput {}

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {
  episodeId: number;
}
