import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Episode } from '../entities/episode.entity';

@InputType()
export class UpdateEpisodeInput extends PartialType(OmitType(Episode, ['id'])) {
  // @Field(() => String)
  // title?: string;
  // @Field(() => String)
  // category?: string;
  // @Field(() => Number)
  // rating?: number;
}

@ObjectType()
export class UpdateEpisodeOutput extends CoreOutput {}
