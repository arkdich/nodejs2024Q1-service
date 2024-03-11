import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  async get() {
    const favorites = await this.favoriteService.get();

    return favorites;
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.favoriteService.addTrack(id);

      return { message: `Track with id ${id} added to favorites` };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.favoriteService.deleteTrack(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.favoriteService.addAlbum(id);

      return { message: `Album with id ${id} added to favorites` };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.favoriteService.deleteAlbum(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.favoriteService.addArtist(id);

      return { message: `Artist with id ${id} added to favorites` };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.favoriteService.deleteArtist(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
