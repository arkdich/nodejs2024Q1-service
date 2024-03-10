import { Inject, Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { FavoriteEntity } from './model/favorite.entity';

@Injectable()
export class FavoriteService {
  private static instance: FavoriteService | null = null;
  private favorites: FavoriteEntity = {
    albums: [],
    artists: [],
    tracks: [],
  };

  @Inject(TrackService)
  private trackService: TrackService | null = null;

  @Inject(AlbumService)
  private albumService: AlbumService | null = null;

  @Inject(ArtistService)
  private artistService: ArtistService | null = null;

  constructor() {
    if (FavoriteService.instance) {
      return FavoriteService.instance;
    }

    FavoriteService.instance = this;
  }

  async addAlbum(id: string) {
    const album = await this.albumService.get(id);

    this.favorites.albums.push(album.id);
  }

  async addTrack(id: string) {
    const track = await this.trackService.get(id);

    this.favorites.tracks.push(track.id);
  }

  async addArtist(id: string) {
    const artist = await this.artistService.get(id);

    this.favorites.artists.push(artist.id);
  }

  async deleteAlbum(id: string) {
    const album = await this.albumService.get(id);

    this.favorites.albums = this.favorites.albums.filter(
      (id) => id !== album.id,
    );
  }

  async deleteTrack(id: string) {
    const track = await this.trackService.get(id);

    this.favorites.tracks = this.favorites.tracks.filter(
      (id) => id !== track.id,
    );
  }

  async deleteArtist(id: string) {
    const artist = await this.artistService.get(id);

    this.favorites.artists = this.favorites.artists.filter(
      (id) => id !== artist.id,
    );
  }

  async get() {
    const tracks = await Promise.all(
      this.favorites.tracks.map((id) => this.trackService.get(id)),
    );

    console.log(tracks[0]);

    const albums = await Promise.all(
      this.favorites.albums.map((id) => this.albumService.get(id)),
    );

    const artists = await Promise.all(
      this.favorites.artists.map((id) => this.artistService.get(id)),
    );

    console.log(tracks);

    return {
      tracks,
      albums,
      artists,
    };
  }
}
