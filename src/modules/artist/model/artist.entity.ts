export class ArtistEntity {
  public id: string;
  public name: string;
  public grammy: boolean;

  constructor(data: Partial<ArtistEntity>) {
    Object.assign(this, data);
  }
}
