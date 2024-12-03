import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { ClanModule } from './clan/clan.module';
import { VillageModule } from './village/village.module';

@Module({
  imports: [CharacterModule, ClanModule, VillageModule],
})
export class ApiModule {}
