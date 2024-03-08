import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';

@Module({
  imports: [UserModule, TrackModule],
})
export class AppModule {}
