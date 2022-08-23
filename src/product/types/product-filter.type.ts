import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Pagination } from 'src/common/types/pagination.type';

export class ProductFilter extends Pagination {
  @IsOptional()
  @MinLength(4)
  public searchText?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public categorySlug: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public subcategorySlug: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  public categoryId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  public subcategoryId: number;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @IsOptional()
  @IsNumber()
  public priceStart: number = 0;

  @IsOptional()
  @IsNumber()
  public priceEnd: number = 2 ** 52;

  @IsOptional()
  @Transform(({ value }) => {
    console.log(value);
    return +value >= 1;
  })
  public contains = true;
}
