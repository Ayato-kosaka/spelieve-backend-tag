import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HBL01MItineraryHashtagController } from './HBL01MItineraryHashtag.controller';
import { HBL01MItineraryHashtagService } from './HBL01MItineraryHashtag.service';

@Module({
  imports: [HttpModule],
  controllers: [HBL01MItineraryHashtagController],
  providers: [HBL01MItineraryHashtagService],
})
export class HBL01MItineraryHashtagModule {}
