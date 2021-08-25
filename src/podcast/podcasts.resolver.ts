import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { EpisodeOutput, EpisodesOutput } from './dtos/episode.output';
import { PodcastOutput, PodcastsOutput } from './dtos/podcast.output';
import {
  UpdateEpisodeInput,
  UpdateEpisodeOutput,
} from './dtos/update-episode.dto';
import {
  UpdatePodcastInput,
  UpdatePodcastOutput,
} from './dtos/update-podcast.dto';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query(() => PodcastsOutput)
  getAllPodcasts(): PodcastsOutput {
    return this.podcastService.getAllPodcasts();
  }

  @Query(() => PodcastOutput)
  getPodcast(@Args('id') podcastId: string): PodcastOutput {
    return this.podcastService.getPodcast(podcastId);
  }

  @Mutation(() => CreatePodcastOutput)
  createPodcast(@Args('input') createPodcastInput: CreatePodcastInput) {
    return this.podcastService.createPodcast(createPodcastInput);
  }

  @Mutation(() => UpdatePodcastOutput)
  updatePodcast(
    @Args('id') podcastId: string,
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): UpdatePodcastOutput {
    return this.podcastService.updatePodcast(podcastId, updatePodcastInput);
  }

  @Mutation(() => UpdatePodcastOutput)
  deletePodcast(@Args('id') podcastId: string): CoreOutput {
    return this.podcastService.deletePodcast(podcastId);
  }

  @Query(() => EpisodesOutput)
  getEpisodes(@Args('id') podcastId: string): EpisodesOutput {
    return this.podcastService.getEpisodes(podcastId);
  }

  @Query(() => EpisodeOutput)
  findEpisode(
    @Args('id') podcastId: string,
    @Args('episodeId') episodeId: string,
  ): EpisodeOutput {
    return this.podcastService.findEpisode(podcastId, episodeId);
  }

  @Mutation(() => CreateEpisodeOutput)
  createEpisode(
    @Args('id') podcastId: string,
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ) {
    return this.podcastService.createEpisode(podcastId, createEpisodeInput);
  }

  @Mutation(() => UpdateEpisodeOutput)
  updateEpisode(
    @Args('id') podcastId: string,
    @Args('episodeId') episodeId: string,
    @Args('input') updateEpisodeInput: UpdateEpisodeInput,
  ): UpdateEpisodeOutput {
    return this.podcastService.updateEpisode(
      podcastId,
      episodeId,
      updateEpisodeInput,
    );
  }

  @Mutation(() => UpdatePodcastOutput)
  deleteEpisode(
    @Args('id') podcastId: string,
    @Args('episodeId') episodeId: string,
  ): CoreOutput {
    return this.podcastService.deleteEpisode(podcastId, episodeId);
  }
}
