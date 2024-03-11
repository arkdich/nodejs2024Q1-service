import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistEntity } from './model/artist.entity';
import { ArtistService } from './artist.service';
import { ArtistDto } from './model/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get(':id')
  async get(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ArtistEntity> {
    try {
      const artist = await this.artistService.get(id);

      return artist;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAll(): Promise<ArtistEntity[]> {
    const artists = await this.artistService.getAll();

    return artists;
  }

  @Post()
  async create(@Body() body: ArtistDto): Promise<ArtistEntity> {
    const artist = await this.artistService.add(body);

    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.artistService.delete(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: ArtistDto,
  ): Promise<ArtistEntity> {
    try {
      const updatedArtist = await this.artistService.update(id, body);

      return updatedArtist;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
