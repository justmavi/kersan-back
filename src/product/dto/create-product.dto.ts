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
import { ValidationHelpers } from 'src/common/helpers/ValidationHelpers';

export class CreateProductDto {
  @Length(3, 20)
  public name: string;

  @Length(0, 2000)
  @IsOptional()
  public description: string;

  @IsOptional()
  @IsArray({
    message: ValidationHelpers.compileValueErrorMessage('an array'),
  })
  @ArrayNotEmpty({
    message: ValidationHelpers.compileValueErrorMessage('a not empty'),
  })
  @IsString({
    message: ValidationHelpers.compileValueErrorMessage('a string element'),
    each: true,
  })
  public tags: string[];

  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: ValidationHelpers.compileValueErrorMessage('a number'),
    },
  )
  public newPrice: number;

  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: ValidationHelpers.compileValueErrorMessage('a number'),
    },
  )
  public oldPrice: number;

  @Transform(({ value }) => ValidationHelpers.booleanVariants.get(value))
  @IsBoolean({
    message: ValidationHelpers.compileValueErrorMessage('true or false'),
  })
  public displayOldPrice: boolean;

  @Transform(({ value }) => ValidationHelpers.booleanVariants.get(value))
  @IsBoolean({
    message: ValidationHelpers.compileValueErrorMessage('true or false'),
  })
  public contains: boolean;

  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: ValidationHelpers.compileValueErrorMessage('a number'),
    },
  )
  public categoryId: number;

  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: ValidationHelpers.compileValueErrorMessage('a number'),
    },
  )
  public subcategoryId: number;

  @Transform(({ value }) => ValidationHelpers.parseToJson(value))
  @IsObject({
    message: ValidationHelpers.compileValueErrorMessage('an object'),
  })
  public properties: Record<string, unknown>;
}
