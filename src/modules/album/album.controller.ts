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
import { AlbumService } from './album.service';
import { AlbumEntity } from './model/album.entity';
import { AlbumDto } from './model/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get(':id')
  async get(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<AlbumEntity> {
    try {
      const album = await this.albumService.get(id);

      return album;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAll(): Promise<AlbumEntity[]> {
    const album = await this.albumService.getAll();

    return album;
  }

  @Post()
  async create(@Body() body: AlbumDto): Promise<AlbumEntity> {
    const album = await this.albumService.add(body);

    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.albumService.delete(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: AlbumDto,
  ): Promise<AlbumEntity> {
    try {
      const updatedAlbum = await this.albumService.update(id, body);

      return updatedAlbum;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
