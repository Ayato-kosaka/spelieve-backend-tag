import { Body, Controller, Post } from '@nestjs/common';

import { HBL001SetMItineraryTagDataService } from './HBL001SetMItineraryTagData.service';

@Controller('HBL001')
export class HBL001SetMItineraryTagDataController {
  constructor(private readonly service: HBL001SetMItineraryTagDataService) { }

  // curl -XPOST -H "Content-Type:application/json" localhost:3072/HBL001
  @Post()
  HBL01(@Body() HBL001Body: Record<string, never>) {
    return this.service.doExecute();
  }
}
