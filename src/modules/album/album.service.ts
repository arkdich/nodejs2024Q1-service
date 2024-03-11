import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AlbumEntity } from './model/album.entity';
import { AlbumDto } from './model/album.dto';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  private static instance: AlbumService | null = null;
  private albums: AlbumEntity[] = [
    // {
    //   id: '050a70a9-7197-430b-b517-780a25b2aed8',
    //   name: 'consequat exercitation aliquip',
    //   artistId: '60c15dbc-2031-32d0-4a0f-48080e878c11',
    //   year: 2015,
    // },
    // {
    //   id: '2ca77a49-4b4c-4fe2-8d13-bd4ce1e08c64',
    //   name: 'consequat exercitation aliquip',
    //   artistId: '60c15dbc-2031-32d0-4a0f-48080e878c11',
    //   year: 2015,
    // },
    // {
    //   id: 'c3e0afc4-28df-4708-bdd5-e188ef6d4dd3',
    //   name: 'consequat exercitation aliquip',
    //   artistId: '60c15dbc-2031-32d0-4a0f-48080e878c11',
    //   year: 2015,
    // },
  ];

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
