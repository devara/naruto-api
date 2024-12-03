import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PER_PAGE,
} from 'src/constants/app.constant';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationMetaDto } from 'src/common/dto/pagination-meta.dto';
import { ClanListRequestDto } from './dto/clan.req.dto';
import { Clan } from './schema/clan.schema';
import { ClanDto } from './dto/clan.dto';
import { CharacterService } from '../character/character.service';
import { CharacterListRequestDto } from '../character/dto/character.req.dto';

@Injectable()
export class ClanService {
  constructor(
    @InjectModel(Clan.name) private model: Model<Clan>,
    private readonly characterService: CharacterService,
  ) {}

  async findAll(params: ClanListRequestDto) {
    const { page = DEFAULT_CURRENT_PAGE, per_page = DEFAULT_PER_PAGE } = params;

    const [count, clans] = await Promise.all([
      await this.model.countDocuments().lean(),
      await this.model
        .find()
        .limit(per_page)
        .skip(per_page * (page - 1))
        .lean(),
    ]);

    return new PaginationDto<ClanDto>(
      plainToInstance(ClanDto, clans),
      new PaginationMetaDto(count, params),
    );
  }

  async findOne(id: number) {
    const clan = await this.findClan(id);

    return instanceToPlain(clan);
  }

  async findClan(id: number) {
    const clan = await this.model.findOne({ id }).lean();

    if (!clan) throw new HttpException('Clan Not Found', HttpStatus.NOT_FOUND);

    return plainToInstance(ClanDto, clan);
  }

  async findCharacters(id: number, params: CharacterListRequestDto) {
    const clan = await this.findClan(id);

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
