import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class SubcategoryFilter extends Pagination {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsNumberString()
  public categoryId: number;
}
