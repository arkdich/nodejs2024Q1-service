import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ArtistDto } from './model/artist.dto';
import { ArtistEntity } from './model/artist.entity';
import { TrackService } from '../track/track.service';

@Injectable()
export class ArtistService {
  private static instance: ArtistService | null = null;
  private artists: ArtistEntity[] = [];

  @Inject(TrackService)
  private tracks: TrackService | null = null;

  constructor() {
    if (ArtistService.instance) {
      return ArtistService.instance;
    }

    ArtistService.instance = this;
  }

  async add(data: ArtistDto) {
    const id = uuid();

    const artist = new ArtistEntity({
      id,
      name: data.name,
      grammy: data.grammy,
    });

    this.artists.push(artist);

    return artist;
  }

  async get(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new Error(`Artist with id ${id} not found`);
    }

    return artist;
  }

  async getAll() {
    return this.artists;
  }

  async delete(id: string) {
    await this.get(id);

    const tracks = await this.tracks.getAll();
    const filteredTracks = tracks.filter((track) => track.artistId === id);

    for (const track of filteredTracks) {
      await this.tracks.update(track.id, { artistId: null });
    }

    this.artists = this.artists.filter((user) => user.id !== id);
  }

  async update(id: string, data: ArtistDto) {
    const artist = await this.get(id);

    artist.name = data.name;
    artist.grammy = data.grammy;

    return artist;
  }
}
