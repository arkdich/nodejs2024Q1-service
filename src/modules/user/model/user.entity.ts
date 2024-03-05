import { Exclude } from 'class-transformer';

export class UserEntity {
  public id: string;
  public login: string;

  @Exclude()
  public password: string;

  public version: number;
  public createdAt: number;
  public updatedAt: number;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
