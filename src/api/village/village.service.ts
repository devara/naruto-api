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
import { VillageDto } from './dto/village.dto';
import { Village } from './schema/village.schema';
import { CharacterService } from '../character/character.service';
import { ClanListRequestDto } from '../clan/dto/clan.req.dto';
import { CharacterListRequestDto } from '../character/dto/character.req.dto';

@Injectable()
export class VillageService {
  constructor(
    @InjectModel(Village.name) private model: Model<Village>,
    private readonly characterService: CharacterService,
  ) {}

  async findAll(params: ClanListRequestDto) {
    const { page = DEFAULT_CURRENT_PAGE, per_page = DEFAULT_PER_PAGE } = params;

    const [count, villages] = await Promise.all([
      await this.model.countDocuments().lean(),
      await this.model
        .find()
        .limit(per_page)
        .skip(per_page * (page - 1))
        .lean(),
    ]);

    return new PaginationDto<VillageDto>(
      plainToInstance(VillageDto, villages),
      new PaginationMetaDto(count, params),
    );
  }

  async findOne(id: number) {
    const village = await this.findVillage(id);

    return instanceToPlain(village);
  }

  async findVillage(id: number) {
    const village = await this.model.findOne({ id }).lean();

    if (!village)
      throw new HttpException('Village Not Found', HttpStatus.NOT_FOUND);

    return plainToInstance(VillageDto, village);
  }

  async findCharacters(id: number, params: CharacterListRequestDto) {
    const village = await this.findVillage(id);

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
