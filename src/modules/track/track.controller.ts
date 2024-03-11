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
import { TrackService } from './track.service';
import { TrackEntity } from './model/track.entity';
import { TrackDto } from './model/track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get(':id')
  async get(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<TrackEntity> {
    try {
      const track = await this.trackService.get(id);

      return track;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAll(): Promise<TrackEntity[]> {
    const tracks = await this.trackService.getAll();

    return tracks;
  }

  @Post()
  async create(@Body() body: TrackDto): Promise<TrackEntity> {
    const user = await this.trackService.add(body);

    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.trackService.delete(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: TrackDto,
  ): Promise<TrackEntity> {
    try {
      const updatedTrack = await this.trackService.update(id, body);

      return updatedTrack;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
