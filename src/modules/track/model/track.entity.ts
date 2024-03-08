export class TrackEntity {
  public id: string;
  public name: string;
  public artistId: string | null;
  public albumId: string | null;
  public duration: number;

  constructor(data: Partial<TrackEntity>) {
    Object.assign(this, data);
  }
}
