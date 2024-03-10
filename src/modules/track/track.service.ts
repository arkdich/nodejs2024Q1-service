import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TrackEntity } from './model/track.entity';
import { TrackDto } from './model/track.dto';

@Injectable()
export class TrackService {
  private static instance: TrackService | null = null;
  private tracks: TrackEntity[] = [
    {
      id: 'a7812f71-b070-4bdc-b7a7-e4dda7785b27',
      name: 'Stressted Out',
      albumId: '845b994c-f4f5-1279-6b18-dae7635290bf',
      artistId: 'fae6a2d2-9522-9a7c-57b2-20600bc46df8',
      duration: 251,
    },
    {
      id: '91e2bc60-a1e3-4ba9-8fa3-2116868cb178',
      name: 'Stressted Out',
      albumId: '845b994c-f4f5-1279-6b18-dae7635290bf',
      artistId: 'fae6a2d2-9522-9a7c-57b2-20600bc46df8',
      duration: 251,
    },
    {
      id: '0d2e1130-7248-434d-ad9a-ad237d59aee0',
      name: 'Stressted Out',
      albumId: '845b994c-f4f5-1279-6b18-dae7635290bf',
      artistId: 'fae6a2d2-9522-9a7c-57b2-20600bc46df8',
      duration: 251,
    },
  ];

  constructor() {
    if (TrackService.instance) {
      return TrackService.instance;
    }

    TrackService.instance = this;
  }

  async add(data: TrackDto) {
    const id = uuid();

    const track = new TrackEntity({
      id,
      name: data.name,
      albumId: data.albumId,
      artistId: data.artistId,
      duration: data.duration,
    });

    this.tracks.push(track);

    return track;
  }

  async get(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new Error(`Track with id ${id} not found`);
    }

    return track;
  }

  async getAll() {
    return this.tracks;
  }

  async delete(id: string) {
    await this.get(id);

    this.tracks = this.tracks.filter((user) => user.id !== id);
  }

  async update(id: string, data: Partial<TrackDto>) {
    const track = await this.get(id);

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        track[key] = value;
      }
    });

    return track;
  }
}
