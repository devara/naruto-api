import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CharacterDto } from 'src/api/character/dto/character.dto';
import { NumberField, StringField } from 'src/decorators/field.decorator';

@Exclude()
export class VillageDto {
  @Expose()
  @NumberField({
    int: true,
    example: 1,
  })
  id: number;

  @Expose()
  @StringField({
    example: 'Konohagakure',
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
