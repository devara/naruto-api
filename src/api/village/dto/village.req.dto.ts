import { CharacterListRequestDto } from 'src/api/character/dto/character.req.dto';
import { PaginationOptionDto } from 'src/common/dto/pagination-option.dto';

export class VillageListRequestDto extends PaginationOptionDto {}

export class VillageDetailRequestDto extends CharacterListRequestDto {}
