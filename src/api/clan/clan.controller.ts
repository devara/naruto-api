import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ClanService } from './clan.service';
import { ClanDetailRequestDto, ClanListRequestDto } from './dto/clan.req.dto';
import { ApiPublicResponse } from 'src/decorators/res.decorator';
import { ClanDto } from './dto/clan.dto';
import { CharacterDto } from '../character/dto/character.dto';

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
    return this.clanService.findAll(params);
  }

  @Get('/clan/:id')
  @ApiPublicResponse({
    type: ClanDto,
    summary: 'Get Clan Detail',
  })
  async getClan(@Param('id', ParseIntPipe) id: number) {
    return this.clanService.findOne(id);
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
    return this.clanService.findCharacters(id, params);
  }
}