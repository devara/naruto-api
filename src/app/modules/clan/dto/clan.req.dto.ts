import { PaginationOptionDto } from 'src/common/dto/pagination-option.dto';
import { CharacterListRequestDto } from '../../character/dto/character.req.dto';

export class ClanListRequestDto extends PaginationOptionDto {}

export class ClanDetailRequestDto extends CharacterListRequestDto {}
