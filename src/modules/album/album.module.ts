import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [TrackModule],
  exports: [AlbumService],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
