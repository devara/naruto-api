import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { VillageService } from './village.service';
import { ClanListRequestDto } from '../clan/dto/clan.req.dto';
import { ApiPublicResponse } from 'src/decorators/res.decorator';
import { VillageDto } from './dto/village.dto';
import { CharacterDto } from '../character/dto/character.dto';
import { VillageDetailRequestDto } from './dto/village.req.dto';

@Controller()
export class VillageController {
  constructor(private readonly villageService: VillageService) {}

  @Get('/villages')
  @ApiPublicResponse({
    type: VillageDto,
    isPaginated: true,
    summary: 'Get Village List',
  })
  async getClans(@Query() params: ClanListRequestDto) {
    return this.villageService.findAll(params);
  }

  @Get('/village/:id')
  @ApiPublicResponse({
    type: VillageDto,
    summary: 'Get Village Detail',
  })
  async getClan(@Param('id', ParseIntPipe) id: number) {
    return this.villageService.findOne(id);
  }

  @Get('/village/:id/characters')
  @ApiPublicResponse({
    type: CharacterDto,
    isPaginated: true,
    summary: 'Get Characters in Village',
  })
  async getVillageCharacters(
    @Param('id', ParseIntPipe) id: number,
    @Query() params: VillageDetailRequestDto,
  ) {
    return this.villageService.findCharacters(id, params);
  }
}
