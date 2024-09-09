import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum ResponsePost {
  OK = 'OK',
  KO = 'KO',
}

@Schema()
export class Geo {
  @Prop({ type: [Number], required: false })
  range: [number, number];

  @Prop({ type: String, required: false })
  country: string;

  @Prop({ type: String, required: false })
  region: string;

  @Prop({ type: Number, required: false })
  eu: number;

  @Prop({ type: String, required: false })
  timezone: string;

  @Prop({ type: String, required: false })
  city: string;

  @Prop({ type: [Number], required: false })
  ll: [number, number];

  @Prop({ type: Number, required: false })
  metro: number;

  @Prop({ type: Number, required: false })
  area: number;
}

export const GeoSchema = SchemaFactory.createForClass(Geo);
