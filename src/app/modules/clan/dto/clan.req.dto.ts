import { PaginationOptionDto } from '@/common/dto/pagination-option.dto';
import { CharacterListRequestDto } from '@/app/modules/character/dto/character.req.dto';

export class ClanListRequestDto extends PaginationOptionDto {}

export class ClanDetailRequestDto extends CharacterListRequestDto {}
