import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'clans' })
export class Clan {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  characters: string[];
}

export type ClanDocument = HydratedDocument<Clan>;
export const ClanSchema = SchemaFactory.createForClass(Clan);
