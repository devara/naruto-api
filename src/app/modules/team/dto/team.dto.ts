import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { NumberField, StringField } from '@/decorators/field.decorator';
import { CharacterDto } from '@/app/modules/character/dto/character.dto';

@Exclude()
export class TeamDto {
  @Expose()
  @NumberField({
    int: true,
    example: 1,
  })
  id: number;

  @Expose()
  @StringField({
    example: 'Konoha Council',
  })
  name: string;

  @Expose()
  @ApiProperty({ type: [Number], required: false })
  characters?: number[];

  @Expose()
  @ApiProperty({ type: [Object] })
  characterLists: CharacterDto[];

  constructor(characters: CharacterDto[]) {
    this.characterLists = characters;
  }
}
