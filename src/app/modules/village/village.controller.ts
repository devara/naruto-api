import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiPublicResponse } from 'src/core/decorators/res.decorator';
import { ClanListRequestDto } from '../clan/dto/clan.req.dto';
import { CharacterDto } from '../character/dto/character.dto';
import { VillageService } from './village.service';
import { VillageDto } from './dto/village.dto';
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
  async getVillages(@Query() params: ClanListRequestDto) {
    return this.villageService.findVillages(params);
  }

  @Get('/village/:id')
  @ApiPublicResponse({
    type: VillageDto,
    summary: 'Get Village Detail',
  })
  async getVillage(@Param('id', ParseIntPipe) id: number) {
    return this.villageService.findVillage(id);
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
    return this.villageService.findVillageCharacters(id, params);
  }
}
