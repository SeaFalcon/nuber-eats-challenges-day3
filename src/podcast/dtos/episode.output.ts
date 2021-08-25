import { ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Episode } from '../entities/episode.entity';

@ObjectType()
export class EpisodesOutput extends CoreOutput {
  episodes: Episode[];
}

@ObjectType()
export class EpisodeOutput extends CoreOutput {
  episode: Episode;
}
