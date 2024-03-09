import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string;
}
