import { Module } from '@nestjs/common';
import { CharacterModule } from './modules/character/character.module';
import { ClanModule } from './modules/clan/clan.module';
import { VillageModule } from './modules/village/village.module';

@Module({
  imports: [CharacterModule, ClanModule, VillageModule],
})
export class ApiModule {}
