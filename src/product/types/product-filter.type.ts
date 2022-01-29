import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class ProductFilters extends Pagination {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public slug: string;

  @IsOptional()
  @MinLength(4)
  public searchText?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  public categoryId: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  public subcategoryId: number;
}
