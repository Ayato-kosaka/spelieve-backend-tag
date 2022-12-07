import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HBL001SetMItineraryTagDataModule } from './HBL001SetMItineraryTagData/HBL001SetMItineraryTagData.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    HBL001SetMItineraryTagDataModule,
  ],
})
export class AppModule {}
