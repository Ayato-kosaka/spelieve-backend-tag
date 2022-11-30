import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HBL01MItineraryHashtagModule } from './HBL01MItineraryHashtag/HBL01MItineraryHashtag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    HBL01MItineraryHashtagModule,
  ],
})
export class AppModule {}
