import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
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

  @IsNumber(
    {},
    {
      message: ValidationHelpers.compileValueErrorMessage('a number'),
    },
  )
  public newPrice: number;

  @IsNumber(
    {},
    {
      message: ValidationHelpers.compileValueErrorMessage('a number'),
    },
  )
  public oldPrice: number;

  @IsBoolean({
    message: ValidationHelpers.compileValueErrorMessage('true or false'),
  })
  public displayOldPrice: boolean;

  @IsBoolean({
    message: ValidationHelpers.compileValueErrorMessage('true or false'),
  })
  public contains: boolean;

  @IsNumber(
    {},
    {
      message: ValidationHelpers.compileValueErrorMessage('a number'),
    },
  )
  public categoryId: number;

  @IsNumber(
    {},
    {
      message: ValidationHelpers.compileValueErrorMessage('a number'),
    },
  )
  public subcategoryId: number;

  // extra field
  public images: string[];
}
