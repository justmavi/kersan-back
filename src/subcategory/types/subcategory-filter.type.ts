import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class SubcategoryFilter extends Pagination {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public slug: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public categoryId: number;
}
