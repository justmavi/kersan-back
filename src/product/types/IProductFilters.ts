import {
  IsEnum,
  IsNotIn,
  IsNumberString,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ValidationHelpers } from 'src/common/helpers/ValidationHelpers';

export class IProductFilters {
  @IsOptional()
  @IsNumberString({
    message: ValidationHelpers.compileValueErrorMessage('a number'),
  })
  lastId?: number;

  @IsOptional()
  @IsNumberString({
    message: ValidationHelpers.compileValueErrorMessage('a number'),
  })
  limit?: number;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'], {
    message: ValidationHelpers.compileValueErrorMessage('ASC or DESC'),
  })
  orderDirection?: 'ASC' | 'DESC';

  @IsOptional()
  @IsNotIn(['tags, photos'], {
    message: ValidationHelpers.compileValueErrorMessage('a supported value'),
  })
  orderBy?: string;

  @IsOptional()
  @MinLength(4)
  searchText?: string;
}
