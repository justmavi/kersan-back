import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class CategoryFilter extends Pagination {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public slug: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
