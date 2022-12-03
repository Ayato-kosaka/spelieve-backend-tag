import { Controller, Get } from '@nestjs/common';

import { HBL01MItineraryHashtagService } from './HBL01MItineraryHashtag.service';

@Controller('HBL01')
export class HBL01MItineraryHashtagController {
  constructor(private readonly service: HBL001SetMItineraryTagDataService) {}

  // curl -XPOST -H "Content-Type:application/json" localhost:3072/HBL001
  @Get()
  HBL01() {
    return this.service.doExecute();
  }
}
