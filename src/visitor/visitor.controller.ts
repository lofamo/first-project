import { Controller, Get, Post, Req } from '@nestjs/common';
import { VisitorService } from './visitor.service';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Post('/csslogo')
  async trackVisitor(@Req() request: any) {
    const userAgent = request.headers['user-agent'];
    return this.visitorService.recordVisit(userAgent);
  }

  @Get()
  async CountVisitor() {
    return this.visitorService.countVisitor();
  }
}
