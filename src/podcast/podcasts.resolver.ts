import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { PodcastOutput } from './dtos/podcast.output';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastService: PodcastsService) {}
  @Query(() => PodcastOutput)
  getAllPodcasts(): PodcastOutput {
    return this.podcastService.getAllPodcasts();
  }

  @Query(() => PodcastOutput)
  getPodcast(@Args('id') podcastId: number): PodcastOutput {
    return this.podcastService.getPodcast(podcastId);
  }

  @Mutation(() => CreatePodcastOutput)
  createPodcast(@Args('input') CreatePodcastInput: CreatePodcastInput) {
    return this.podcastService.createPodcast(CreatePodcastInput);
  }
}
