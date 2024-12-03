import { Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { WrapperType } from 'src/common/types/types';
import {
  ClassField,
  NumberField,
  StringField,
} from 'src/decorators/field.decorator';

@Exclude()
export class CharacterDto {
  @Expose()
  @NumberField({
    int: true,
    example: 1,
  })
  id: number;

  @Expose()
  @StringField({
    example: 'Naruto Uzumaki',
  })
  name: string;

  @Expose()
  @StringField({ each: true, required: false })
  images?: string[];

  @Expose()
  @StringField({ each: true, required: false })
  jutsu?: string[];

  @Expose()
  @IsOptional()
  rank?: {
    ninjaRank?: Record<string, unknown>;
    ninjaRegistration?: string;
  };

  @Expose()
  @ClassField(() => CharacterPersonalDto)
  personal?: WrapperType<CharacterPersonalDto>;

  @Expose()
  @ClassField(() => CharacterFamilyDto)
  family?: WrapperType<CharacterFamilyDto>;

  @Expose()
  @ClassField(() => CharacterDebutDto)
  debut?: WrapperType<CharacterDebutDto>;

  @Expose()
  @ClassField(() => CharacterVoiceActorDto)
  voiceActors?: WrapperType<CharacterVoiceActorDto>;
}

@Exclude()
export class CharacterPersonalDto {
  @Expose()
  @StringField({ required: false })
  birthdate?: string;

  @Expose()
  @StringField()
  sex: string;

  @Expose()
  @StringField()
  clan: string;

  @Expose()
  @StringField({ each: true, required: false })
  affiliation?: string[];

  @Expose()
  @StringField({ each: true, required: false })
  team?: string[];

  @Expose()
  @StringField({ each: true, required: false })
  titles?: string[];

  @Expose()
  @StringField({ each: true, required: false })
  kekkeiGenkai?: string[];
}

export class CharacterFamilyDto {
  @Expose()
  @StringField({ required: false })
  father?: string;

  @Expose()
  @StringField({ required: false })
  mother?: string;

  @Expose()
  @StringField({ required: false })
  wife?: string;

  @Expose()
  @StringField({ required: false })
  son?: string;

  @Expose()
  @StringField({ required: false })
  daughter?: string;
}

export class CharacterDebutDto {
  @Expose()
  @StringField({ required: false })
  manga?: string;

  @Expose()
  @StringField({ required: false })
  anime?: string;

  @Expose()
  @StringField({ required: false })
  novel?: string;

  @Expose()
  @StringField({ required: false })
  movie?: string;

  @Expose()
  @StringField({ required: false })
  game?: string;

  @Expose()
  @StringField({ required: false })
  ova?: string;
}

export class CharacterVoiceActorDto {
  @Expose()
  @StringField({ each: true, required: false })
  japanese?: string[];

  @Expose()
  @StringField({ each: true, required: false })
  english?: string[];
}
