import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEpisodeInput } from './dtos/create-episode.dto';
import { CreatePodcastInput } from './dtos/create-podcast.dto';
import { UpdateEpisodeInput } from './dtos/update-episode.dto';
import { UpdatePodcastInput } from './dtos/update-podcast.dto';
import { PodcastsService } from './podcasts.service';

@Controller('/podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getAllPodcasts() {
    return this.podcastsService.getAllPodcasts();
  }

  @Post()
  createPodcast(@Body() CreatePodcastInput: CreatePodcastInput) {
    return this.podcastsService.createPodcast(CreatePodcastInput);
  }

  @Get('/:id')
  getPodcast(@Param('id') id: string) {
    return this.podcastsService.getPodcast(id);
  }

  @Patch('/:id')
  updatePodcast(
    @Param('id') id: string,
    @Body() UpdatePodcastInput: UpdatePodcastInput,
  ) {
    return this.podcastsService.updatePodcast(id, UpdatePodcastInput);
  }

  @Delete('/:id')
  deletePodcast(@Param('id') id: string) {
    return this.podcastsService.deletePodcast(id);
  }
}

@Controller('/podcasts/:id')
export class EpisodeController {
  constructor(private readonly podcastService: PodcastsService) {}
  @Get('/episodes')
  getEpisodes(@Param('id') podcastId: string) {
    return this.podcastService.getEpisodes(podcastId);
  }

  @Post('/episodes')
  createEpisode(
    @Param('id') podcastId: string,
    @Body() createEpisodeDto: CreateEpisodeInput,
  ) {
    return this.podcastService.createEpisode(podcastId, createEpisodeDto);
  }

  @Patch('/episodes/:episodeId')
  updateEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
    @Body() updateEpisodeDto: UpdateEpisodeInput,
  ) {
    return this.podcastService.updateEpisode(
      podcastId,
      episodeId,
      updateEpisodeDto,
    );
  }

  @Delete('/episodes/:episodeId')
  deleteEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
  ) {
    return this.podcastService.deleteEpisode(podcastId, episodeId);
  }
}
