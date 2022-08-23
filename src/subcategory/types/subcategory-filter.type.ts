import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class SubcategoryFilter extends Pagination {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public categorySlug: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public categoryId: number;
}
