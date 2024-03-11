export class AlbumEntity {
  public id: string;
  public name: string;
  public year: number;
  public artistId: string | null;

  constructor(data: Partial<AlbumEntity>) {
    Object.assign(this, data);
  }
}
