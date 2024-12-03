import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginationMetaDto } from './pagination-meta.dto';

export class PaginationDto<T> {
  @Expose()
  @ApiProperty({ type: [Object] })
  readonly data: T[];

  @Expose()
  @ApiProperty()
  meta: PaginationMetaDto;

  constructor(data: T[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
