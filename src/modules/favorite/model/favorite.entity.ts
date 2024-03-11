export class FavoriteEntity {
  public artists: string[];
  public albums: string[];
  public tracks: string[];

  constructor(data: Partial<FavoriteEntity>) {
    Object.assign(this, data);
  }
}
