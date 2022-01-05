import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ValidationHelpers } from 'src/common/helpers/ValidationHelpers';

import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsArray({
    message: ValidationHelpers.compileValueErrorMessage('an array'),
  })
  @Type(() => Number)
  @IsNumber(
    {},
    {
      each: true,
      message: ValidationHelpers.compileValueErrorMessage('a number element'),
    },
  )
  public deletedImages: Array<number>;
}
