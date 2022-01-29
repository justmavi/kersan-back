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
  public lastId?: number = 0;

  @IsOptional()
  @IsInt()
  public limit?: number = 20;

  @IsOptional()
  @IsEnum(OrderDirection)
  public orderDirection?: 'ASC' | 'DESC' = OrderDirection.ASC;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public orderBy?: string = 'id';
}
