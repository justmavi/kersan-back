import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class CategoryFilter extends Pagination {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
