import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as useragent from 'useragent';
import * as geoip from 'geoip-lite';
import { Visitor, VisitorDocument } from './entities/visitor.entity';
import axios from 'axios';
import { ResponsePost } from './entities/geo.entity';

@Injectable()
export class VisitorService {
  constructor(
    @InjectModel(Visitor.name)
    private readonly visitorModel: Model<VisitorDocument>,
  ) {}

  async recordVisit(userAgent: string): Promise<ResponsePost> {
    try {
      const ip = await this.findIpAgent();
      if (ip) {
        const agent = useragent.parse(userAgent);
        const browser = agent.toAgent();
        const geo = geoip.lookup(ip);
        console.log('geo:', geo);

        const newVisitor = new this.visitorModel({
          ip,
          browser,
          geo,
        });

        newVisitor.save();
      }
      return ResponsePost.OK;
    } catch (error) {
      console.error('Error recording visit:', error);
      return ResponsePost.KO;
    }
  }

  async findIpAgent(): Promise<string | null> {
    try {
      const response = await axios.get('https://api.ipify.org/?format=json');
      return response.data.ip;
    } catch (error) {
      return null;
    }
  }

  async countVisitor() {
    return await this.visitorModel.countDocuments();
  }
}
