import { PaginationOptionDto } from '@/common/dto/pagination-option.dto';
import { StringArrayField } from '@/decorators/field.decorator';

export class CharacterListRequestDto extends PaginationOptionDto {
  @StringArrayField({ required: false })
  fields?: string[];
}

export class CharacterFieldRequestDto {
  @StringArrayField({ required: false })
  fields?: string[];
}
