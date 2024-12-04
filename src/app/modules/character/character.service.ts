import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PER_PAGE,
} from '@/constants/app.constant';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginationMetaDto } from '@/common/dto/pagination-meta.dto';
import { Character } from './schema/character.schema';
import { CharacterDto } from './dto/character.dto';
import {
  CharacterFieldRequestDto,
  CharacterListRequestDto,
} from './dto/character.req.dto';
import { getExcludedFields } from './character.util';

interface FindOptions {
  query?: FilterQuery<Character>;
  params?: CharacterListRequestDto;
}

@Injectable()
export class CharacterService {
  constructor(@InjectModel(Character.name) private model: Model<Character>) {}

  async findAll(params: CharacterListRequestDto) {
    return this.findCharacters({ params });
  }

  async findOne(id: number, params: CharacterFieldRequestDto) {
    const { fields } = params;

    const character = await this.model
      .findOne({ id })
      .select(getExcludedFields(fields ?? []))
      .lean();

    if (!character)
      throw new HttpException('Character Not Found', HttpStatus.NOT_FOUND);

    return plainToInstance(CharacterDto, character);
  }

  async findCharacters(options: FindOptions = {}) {
    const {
      page = DEFAULT_CURRENT_PAGE,
      per_page = DEFAULT_PER_PAGE,
      fields,
    } = options.params;

    const [count, characters] = await Promise.all([
      await this.model.countDocuments(options.query).lean(),
      await this.model
        .find(options.query)
        .select(getExcludedFields(fields ?? []))
        .limit(per_page)
        .skip(per_page * (page - 1))
        .lean(),
    ]);

    return new PaginationDto(
      plainToInstance(CharacterDto, characters),
      new PaginationMetaDto(count, options.params),
    );
  }
}
