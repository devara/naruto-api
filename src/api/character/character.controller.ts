import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CharacterDto } from './dto/character.dto';
import { CharacterService } from './character.service';
import {
  CharacterFieldRequestDto,
  CharacterListRequestDto,
} from './dto/character.req.dto';
import { ApiPublicResponse } from 'src/decorators/res.decorator';

@Controller()
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get('/characters')
  @ApiPublicResponse({
    type: CharacterDto,
    isPaginated: true,
    summary: 'Get Character List',
  })
  async getAllCharacter(
    @Query() params: CharacterListRequestDto,
  ): Promise<PaginationDto<CharacterDto>> {
    return this.characterService.findAll(params);
  }

  @Get('/character/:id')
  @ApiPublicResponse({
    type: CharacterDto,
    summary: 'Get Character Detail',
  })
  async getCharacter(
    @Param('id', ParseIntPipe) id: number,
    @Query() params: CharacterFieldRequestDto,
  ) {
    return this.characterService.findOne(id, params);
  }
}
