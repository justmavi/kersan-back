import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ValidationHelpers } from 'src/common/helpers/validation.helper';

export class CreateProductDto {
  @Length(3, 20)
  public name: string;

  @Length(3, 20)
  public slug: string;

  @Length(0, 2000)
  @IsOptional()
  public description: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags: string[];

  @Type(() => Number)
  @IsNumber()
  public newPrice: number;

  @Type(() => Number)
  @IsNumber()
  public oldPrice: number;

  @Transform(({ value }) => ValidationHelpers.booleanVariants.get(value))
  @IsBoolean()
  public contains: boolean;

  @Type(() => Number)
  @IsNumber()
  public categoryId: number;

  @Type(() => Number)
  @IsNumber()
  public subcategoryId: number;

  @Transform(({ value }) => ValidationHelpers.parseToJson(value))
  @IsObject()
  public properties: Record<string, unknown>;
}
