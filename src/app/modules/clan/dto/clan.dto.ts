import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { NumberField, StringField } from 'src/core/decorators/field.decorator';
import { CharacterDto } from '../../character/dto/character.dto';

@Exclude()
export class ClanDto {
  @Expose()
  @NumberField({
    int: true,
    example: 1,
  })
  id: number;

  @Expose()
  @StringField({
    example: 'Uchiha',
  })
  name: string;

  @Expose({ name: 'charactersCount' })
  getCharactersCount(): number {
    return this.characters.length ?? 0;
  }

  @Expose()
  @ApiProperty({ type: [Number], required: false })
  characters?: number[];

  @Expose()
  @ApiProperty({ type: [Object] })
  characterLists: CharacterDto[];

  constructor(characters: CharacterDto[]) {
    this.characterLists = plainToInstance(CharacterDto, characters);
  }
}
