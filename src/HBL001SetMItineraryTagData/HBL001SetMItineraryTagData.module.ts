import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HBL001SetMItineraryTagDataController } from './HBL001SetMItineraryTagData.controller';
import { HBL001SetMItineraryTagDataService } from './HBL001SetMItineraryTagData.service';

@Module({
  imports: [HttpModule],
  controllers: [HBL001SetMItineraryTagDataController],
  providers: [HBL001SetMItineraryTagDataService],
})
export class HBL001SetMItineraryTagDataModule { }
