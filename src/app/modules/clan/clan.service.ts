import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PaginationMetaDto } from 'src/common/dto/pagination-meta.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PER_PAGE,
} from 'src/constants/app.constant';
import { BaseService } from 'src/core/abstracts/base.service';
import { ClanListRequestDto } from './dto/clan.req.dto';
import { Clan } from './schema/clan.schema';
import { ClanDto } from './dto/clan.dto';
import { CharacterService } from '../character/character.service';
import { CharacterListRequestDto } from '../character/dto/character.req.dto';

@Injectable()
export class ClanService extends BaseService<Clan> {
  constructor(
    @InjectModel(Clan.name) model: Model<Clan>,
    private readonly characterService: CharacterService,
  ) {
    super(model);
  }

  async findClans(params: ClanListRequestDto) {
    const { page = DEFAULT_CURRENT_PAGE, per_page = DEFAULT_PER_PAGE } = params;

    const [count, clans] = await Promise.all([
      await this.count(),
      await this.find({
        options: {
          limit: per_page,
          skip: per_page * (page - 1),
        },
      }),
    ]);

    return new PaginationDto<ClanDto>(
      plainToInstance(ClanDto, clans),
      new PaginationMetaDto(count, params),
    );
  }

  async findClan(id: number) {
    const clan = await this.findOne({ id });
    if (!clan) throw new HttpException('Clan Not Found', HttpStatus.NOT_FOUND);

    return instanceToPlain(plainToInstance(ClanDto, clan));
  }

  async findClanCharacters(id: number, params: CharacterListRequestDto) {
    const clan = await this.findOne({ id });
    if (!clan) throw new HttpException('Clan Not Found', HttpStatus.NOT_FOUND);

    return this.characterService.findCharacters({
      query: {
        id: {
          $in: clan.characters,
        },
      },
      params,
    });
  }
}
