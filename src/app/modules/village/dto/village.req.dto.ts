import { PaginationOptionDto } from 'src/common/dto/pagination-option.dto';
import { CharacterListRequestDto } from '../../character/dto/character.req.dto';

export class VillageListRequestDto extends PaginationOptionDto {}

export class VillageDetailRequestDto extends CharacterListRequestDto {}
