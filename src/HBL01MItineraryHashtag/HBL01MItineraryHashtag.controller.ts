import { Controller, Get } from '@nestjs/common';

import { HBL01MItineraryHashtagService } from './HBL01MItineraryHashtag.service';

@Controller('HBL001')
export class HBL001SetMItineraryTagDataController {
  constructor(private readonly service: HBL001SetMItineraryTagDataService) {}

  // curl -XPOST -H "Content-Type:application/json" localhost:3072/HBL001
  @Post()
  HBL01(@Body() HBL01Body: Record<string, never>) {
    return this.service.doExecute();
  }
}
}
