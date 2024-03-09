import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { ArtistModule } from './modules/artist/artist.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule],
})
export class AppModule {}
