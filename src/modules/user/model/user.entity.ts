import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn({
    type: 'uniqueidentifier',
  })
  public id: string;

  @Column()
  public login: string;

  @Column()
  @Exclude()
  public password: string;

  @Column()
  public version: number;

  @Column()
  public createdAt: number;

  @Column()
  public updatedAt: number;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
