import { Controller, Get } from '@nestjs/common';

import { HBL01MItineraryHashtagService } from './HBL01MItineraryHashtag.service';

@Controller('HBL01')
export class HBL01MItineraryHashtagController {
  constructor(private readonly service: HBL01MItineraryHashtagService) {}

  // curl -XGET -H "Content-Type:application/json" localhost:3000/HBL01
  @Get()
  HBL01() {
    return this.service.doExecute();
  }
}
