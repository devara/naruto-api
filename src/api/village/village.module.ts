import { Module } from '@nestjs/common';
import { VillageController } from './village.controller';
import { VillageService } from './village.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Village, VillageSchema } from './schema/village.schema';
import {
  Character,
  CharacterSchema,
} from '../character/schema/character.schema';
import { CharacterService } from '../character/character.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Village.name,
        schema: VillageSchema,
      },
      {
        name: Character.name,
        schema: CharacterSchema,
      },
    ]),
  ],
  controllers: [VillageController],
  providers: [VillageService, CharacterService],
})
export class VillageModule {}
