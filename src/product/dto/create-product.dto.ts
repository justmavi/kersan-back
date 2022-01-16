import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ValidationHelpers } from 'src/common/helpers/ValidationHelpers';

export class CreateProductDto {
  @Length(3, 20)
  public name: string;

  @Length(0, 2000)
  @IsOptional()
  public description: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags: string[];

  @IsInt()
  public newPrice: number;

  @IsInt()
  public oldPrice: number;

  @Transform(({ value }) => ValidationHelpers.booleanVariants.get(value))
  @IsBoolean()
  public displayOldPrice: boolean;

  @Transform(({ value }) => ValidationHelpers.booleanVariants.get(value))
  @IsBoolean()
  public contains: boolean;

  @IsInt()
  public categoryId: number;

  @IsInt()
  public subcategoryId: number;

  @Transform(({ value }) => ValidationHelpers.parseToJson(value))
  @IsObject()
  public properties: Record<string, unknown>;
}
