import {
  IsEnum,
  IsNotIn,
  IsNumberString,
  IsOptional,
  MinLength,
} from 'class-validator';

export class IProductFilters {
  @IsOptional()
  @IsNumberString()
  lastId?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  orderDirection?: 'ASC' | 'DESC';

  @IsOptional()
  @IsNotIn(['tags, photos'])
  orderBy?: string;

  @IsOptional()
  @MinLength(4)
  searchText?: string;
}
