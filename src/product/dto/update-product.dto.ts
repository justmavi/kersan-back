import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsInt, IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  public deletedImages: Array<number>;
}
