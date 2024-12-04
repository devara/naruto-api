import { Module } from '@nestjs/common';
import { CharacterModule } from '@/app/modules/character/character.module';
import { ClanModule } from '@/app/modules/clan/clan.module';
import { VillageModule } from '@/app/modules/village/village.module';

@Module({
  imports: [CharacterModule, ClanModule, VillageModule],
})
export class ApiModule {}
