import { IsOptional, MinLength } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class ProductFilters extends Pagination {
  @IsOptional()
  @MinLength(4)
  searchText?: string;
}
