import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'villages' })
export class Village {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  characters: string[];
}

export type VillageDocument = HydratedDocument<Village>;
export const VillageSchema = SchemaFactory.createForClass(Village);
