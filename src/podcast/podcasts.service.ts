import { Injectable } from '@nestjs/common';
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
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAllPodcasts(): PodcastsOutput {
    return { podcasts: this.podcasts, err: null, success: true };
  }

  createPodcast({ title, category }: CreatePodcastInput): CreatePodcastOutput {
    const id = Date.now();
    this.podcasts.push({ id, title, category, rating: 0, episodes: [] });
    return { id, err: null, success: true };
  }

  getPodcast(id: string): PodcastOutput {
    const foundPodcasts = this.podcasts.filter((podcast) => podcast.id === +id);
    if (foundPodcasts.length === 0) {
      return { podcast: null, err: 'Podcast not found.', success: false };
    }
    if (foundPodcasts.length === 1) {
      return { podcast: foundPodcasts[0], err: null, success: true };
    }
    if (foundPodcasts.length > 2) {
      return {
        podcast: null,
        err: 'More than one items with same id.',
        success: false,
      };
    }
  }

  deletePodcast(id: string): CoreOutput {
    this.podcasts = this.podcasts.filter((p) => p.id !== +id);
    return { err: null, success: true };
  }

  updatePodcast(
    id: string,
    updatePodcastInput: UpdatePodcastInput,
  ): UpdatePodcastOutput {
    const { podcast, err: findErr } = this.getPodcast(id);
    if (findErr) {
      return { err: findErr, success: false };
    }
    const { err: deleteErr } = this.deletePodcast(id);
    if (deleteErr) {
      return { err: deleteErr, success: false };
    }
    this.podcasts.push({ ...podcast, ...updatePodcastInput });
    return { err: null, success: true };
  }

  getEpisodes(podcastId: string): EpisodesOutput {
    const { podcast, err } = this.getPodcast(podcastId);
    if (err) {
      return { episodes: null, err, success: false };
    }
    return { episodes: podcast.episodes, err: null, success: true };
  }

  createEpisode(
    podcastId: string,
    { title, category }: CreateEpisodeInput,
  ): CreateEpisodeOutput {
    const { podcast, err: findErr } = this.getPodcast(podcastId);
    if (findErr) {
      return { episodeId: null, err: findErr, success: false };
    }
    const episodeId = Date.now();
    const newEpisode: Episode = { id: episodeId, title, category, rating: 0 };
    const { err } = this.updatePodcast(podcastId, {
      ...podcast,
      episodes: [...podcast.episodes, newEpisode],
    });
    if (err) {
      return { episodeId: null, err, success: false };
    }
    return { episodeId, err: null, success: true };
  }

  deleteEpisode(podcastId: string, episodeId: string): CoreOutput {
    const { podcast, err: findErr } = this.getPodcast(podcastId);
    if (findErr) {
      return { err: findErr, success: false };
    }
    const { err } = this.updatePodcast(podcastId, {
      episodes: podcast.episodes.filter((episode) => episode.id !== +episodeId),
    });
    if (err) {
      return { err, success: false };
    }
    return { err: null, success: true };
  }

  findEpisode(podcastId: string, episodeId: string): EpisodeOutput {
    const { episodes, err: findErr } = this.getEpisodes(podcastId);
    if (findErr) {
      return { episode: null, err: findErr, success: false };
    }
    const episode = episodes.find((episode) => episode.id === +episodeId);
    if (!episode) {
      return { episode: null, err: 'Episode not found', success: false };
    }
    return { episode, err: null, success: true };
  }

  updateEpisode(
    podcastId: string,
    episodeId: string,
    updateEpisodeDto: UpdateEpisodeInput,
  ): UpdateEpisodeOutput {
    const { episode, err: findEpisodeErr } = this.findEpisode(
      podcastId,
      episodeId,
    );
    if (findEpisodeErr) {
      return { err: findEpisodeErr, success: false };
    }
    const { err: deleteErr } = this.deleteEpisode(podcastId, episodeId);
    if (deleteErr) {
      return { err: deleteErr, success: false };
    }
    const { podcast, err: fundPodcastErr } = this.getPodcast(podcastId);
    if (fundPodcastErr) {
      return { err: fundPodcastErr, success: false };
    }
    this.updatePodcast(podcastId, {
      ...podcast,
      episodes: [...podcast.episodes, { ...episode, ...updateEpisodeDto }],
    });
    return { err: null, success: true };
  }
}
