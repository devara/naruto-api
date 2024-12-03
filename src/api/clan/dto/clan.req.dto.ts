import { CharacterListRequestDto } from 'src/api/character/dto/character.req.dto';
import { PaginationOptionDto } from 'src/common/dto/pagination-option.dto';

export class ClanListRequestDto extends PaginationOptionDto {}

export class ClanDetailRequestDto extends CharacterListRequestDto {}
