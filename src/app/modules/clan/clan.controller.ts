import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiPublicResponse } from '@/decorators/res.decorator';
import { ClanService } from './clan.service';
import { ClanDetailRequestDto, ClanListRequestDto } from './dto/clan.req.dto';
import { ClanDto } from './dto/clan.dto';
import { CharacterDto } from '@/app/modules/character/dto/character.dto';

@Controller()
export class ClanController {
  constructor(private readonly clanService: ClanService) {}

  @Get('/clans')
  @ApiPublicResponse({
    type: ClanDto,
    isPaginated: true,
    summary: 'Get Clan List',
  })
  async getClans(@Query() params: ClanListRequestDto) {
    return this.clanService.findClans(params);
  }

  @Get('/clan/:id')
  @ApiPublicResponse({
    type: ClanDto,
    summary: 'Get Clan Detail',
  })
  async getClan(@Param('id', ParseIntPipe) id: number) {
    return this.clanService.findClan(id);
  }

  @Get('/clan/:id/characters')
  @ApiPublicResponse({
    type: CharacterDto,
    isPaginated: true,
    summary: 'Get Characters in Clan',
  })
  async getClanCharacters(
    @Param('id', ParseIntPipe) id: number,
    @Query() params: ClanDetailRequestDto,
  ) {
    return this.clanService.findClanCharacters(id, params);
  }
}
