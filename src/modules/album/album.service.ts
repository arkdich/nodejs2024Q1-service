import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AlbumEntity } from './model/album.entity';
import { AlbumDto } from './model/album.dto';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  private static instance: AlbumService | null = null;
  private albums: AlbumEntity[] = [];

  @Inject(TrackService)
  private tracks: TrackService | null = null;

  constructor() {
    if (AlbumService.instance) {
      return AlbumService.instance;
    }

    AlbumService.instance = this;
  }

  async add(data: AlbumDto) {
    const id = uuid();

    const album = new AlbumEntity({
      id,
      name: data.name,
      artistId: data.artistId,
      year: data.year,
    });

    this.albums.push(album);

    return album;
  }

  async get(id: string) {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new Error(`Album with id ${id} not found`);
    }

    return album;
  }

  async getAll() {
    return this.albums;
  }

  async delete(id: string) {
    await this.get(id);

    const tracks = await this.tracks.getAll();
    const filteredTracks = tracks.filter((track) => track.albumId === id);

    for (const track of filteredTracks) {
      await this.tracks.update(track.id, { albumId: null });
    }

    this.albums = this.albums.filter((user) => user.id !== id);
  }

  async update(id: string, data: Partial<AlbumDto>) {
    const album = await this.get(id);

    album.name = data.name;
    album.year = data.year;
    album.artistId = data.artistId;

    return album;
  }
}
