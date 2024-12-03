import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { CharacterDto } from 'src/api/character/dto/character.dto';
import { NumberField, StringField } from 'src/decorators/field.decorator';

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
