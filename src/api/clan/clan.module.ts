import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClanController } from './clan.controller';
import { Clan, ClanSchema } from './schema/clan.schema';
import { ClanService } from './clan.service';
import {
  Character,
  CharacterSchema,
} from '../character/schema/character.schema';
import { CharacterService } from '../character/character.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Clan.name,
        schema: ClanSchema,
      },
      {
        name: Character.name,
        schema: CharacterSchema,
      },
    ]),
  ],
  controllers: [ClanController],
  providers: [ClanService, CharacterService],
})
export class ClanModule {}
