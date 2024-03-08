import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TrackEntity } from './model/track.entity';
import { TrackDto } from './model/track.dto';

@Injectable()
export class TrackService {
  private static instance: TrackService | null = null;
  private users: TrackEntity[] = [];

  constructor() {
    if (TrackService.instance) {
      return TrackService.instance;
    }

    TrackService.instance = this;
  }

  async add(data: TrackDto) {
    const id = uuid();

    const user = new TrackEntity({
      id,
      name: data.name,
      albumId: data.albumId,
      artistId: data.artistId,
      duration: data.duration,
    });

    this.users.push(user);

    return user;
  }

  async get(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }

  async getAll() {
    return this.users;
  }

  async delete(id: string) {
    await this.get(id);

    this.users = this.users.filter((user) => user.id !== id);
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
