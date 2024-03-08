import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class TrackDto {
  @IsString()
  name: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsPositive()
  duration: number;
}
