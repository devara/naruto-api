import { PaginationOptionDto } from 'src/common/dto/pagination-option.dto';
import { StringArrayField } from 'src/decorators/field.decorator';

export class CharacterListRequestDto extends PaginationOptionDto {
  @StringArrayField({ required: false })
  fields?: string[];
}

export class CharacterFieldRequestDto {
  @StringArrayField({ required: false })
  fields?: string[];
}
