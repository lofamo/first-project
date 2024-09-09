import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Geo, GeoSchema } from './geo.entity';
enum PROVIDERS {
  CSSLOGO = 'csslogo',
}
@Schema({
  id: true,
  versionKey: false,
  timestamps: false,
  toJSON: {
    virtuals: true,
    transform(_: any, ret: any) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret._v;
    },
  },
})
export class Visitor {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  browser: string;

  @Prop({ required: true, type: GeoSchema })
  geo: Geo;

  @Prop({ default: PROVIDERS.CSSLOGO })
  provider: PROVIDERS;

  @Prop({ default: Date.now })
  visitedAt: Date;
}

export type VisitorDocument = Visitor & Document;
export const VisitorSchema = SchemaFactory.createForClass(Visitor);
