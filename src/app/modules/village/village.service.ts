import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { BaseService } from 'src/core/abstracts/base.service';
import { PaginationMetaDto } from 'src/common/dto/pagination-meta.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PER_PAGE,
} from 'src/constants/app.constant';
import { VillageDto } from './dto/village.dto';
import { Village } from './schema/village.schema';
import { CharacterService } from '../character/character.service';
import { ClanListRequestDto } from '../clan/dto/clan.req.dto';
import { CharacterListRequestDto } from '../character/dto/character.req.dto';

@Injectable()
export class VillageService extends BaseService<Village> {
  constructor(
    @InjectModel(Village.name) model: Model<Village>,
    private readonly characterService: CharacterService,
  ) {
    super(model);
  }

  async findVillages(params: ClanListRequestDto) {
    const { page = DEFAULT_CURRENT_PAGE, per_page = DEFAULT_PER_PAGE } = params;

    const [count, villages] = await Promise.all([
      await this.count(),
      await this.find({
        options: {
          limit: per_page,
          skip: per_page * (page - 1),
        },
      }),
    ]);

    return new PaginationDto<VillageDto>(
      plainToInstance(VillageDto, villages),
      new PaginationMetaDto(count, params),
    );
  }

  async findVillage(id: number) {
    const village = await this.findOne({ id });
    if (!village)
      throw new HttpException('Village Not Found', HttpStatus.NOT_FOUND);

    return instanceToPlain(village);
  }

  async findVillageCharacters(id: number, params: CharacterListRequestDto) {
    const village = await this.findOne({ id });
    if (!village)
      throw new HttpException('Village Not Found', HttpStatus.NOT_FOUND);

    return this.characterService.findCharacters({
      query: {
        id: {
          $in: village.characters,
        },
      },
      params,
    });
  }
}
