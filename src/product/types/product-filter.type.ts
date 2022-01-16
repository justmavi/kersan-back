import { IsEnum, IsInt, IsNotIn, IsOptional, MinLength } from 'class-validator';

export class IProductFilters {
  @IsOptional()
  @IsInt()
  lastId?: number;

  @IsOptional()
  @IsInt()
  limit?: number = 20;

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
