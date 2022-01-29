import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderDirection } from '../enums/order-direction.enum';

export class Pagination {
  @IsOptional()
  @IsInt()
  lastId?: number = 0;

  @IsOptional()
  @IsInt()
  limit?: number = 20;

  @IsOptional()
  @IsEnum(OrderDirection)
  orderDirection?: 'ASC' | 'DESC' = OrderDirection.ASC;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  orderBy?: string = 'id';
}
