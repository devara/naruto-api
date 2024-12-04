import { CharacterListRequestDto } from '@/app/modules/character/dto/character.req.dto';
import { PaginationOptionDto } from '@/common/dto/pagination-option.dto';

export class VillageListRequestDto extends PaginationOptionDto {}

export class VillageDetailRequestDto extends CharacterListRequestDto {}
