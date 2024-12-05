import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { BaseService } from 'src/core/abstracts/base.service';
import { PaginationMetaDto } from 'src/common/dto/pagination-meta.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Character } from './schema/character.schema';
import { CharacterDto } from './dto/character.dto';
import {
  CharacterFieldRequestDto,
  CharacterListRequestDto,
} from './dto/character.req.dto';
import { getExcludedFields } from './character.util';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PER_PAGE,
} from 'src/constants/app.constant';

interface FindOptions {
  query?: FilterQuery<Character>;
  params?: CharacterListRequestDto;
}

@Injectable()
export class CharacterService extends BaseService<Character> {
  constructor(@InjectModel(Character.name) model: Model<Character>) {
    super(model);
  }

  async findAll(params: CharacterListRequestDto) {
    return this.findCharacters({ params });
  }

  async findCharacters(options: FindOptions = {}) {
    const {
      page = DEFAULT_CURRENT_PAGE,
      per_page = DEFAULT_PER_PAGE,
      fields,
    } = options.params;

    const [count, characters] = await Promise.all([
      await this.count({ filter: options.query }),
      await this.find({
        filter: options.query,
        selects: getExcludedFields(fields ?? []),
        options: {
          limit: per_page,
          skip: per_page * (page - 1),
        },
      }),
    ]);

    return new PaginationDto(
      plainToInstance(CharacterDto, characters),
      new PaginationMetaDto(count, options.params),
    );
  }

  async findCharacter(id: number, params: CharacterFieldRequestDto) {
    const { fields } = params;

    const character = await this.find({
      filter: { id },
      selects: getExcludedFields(fields ?? []),
    });

    if (!character)
      throw new HttpException('Character Not Found', HttpStatus.NOT_FOUND);

    return plainToInstance(CharacterDto, character);
  }
}
