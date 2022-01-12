import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber(
    {},
    {
      each: true,
    },
  )
  public deletedImages: Array<number>;
}
