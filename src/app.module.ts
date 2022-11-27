import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HBL01MItineraryHashtagModule } from './HBL01MItineraryHashtag/HBL01MItineraryHashtag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    HBL01MItineraryHashtagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
