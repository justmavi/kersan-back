import { IsEnum, IsNotIn, IsNumberString, IsOptional } from 'class-validator';
import { ValidationHelpers } from 'src/common/helpers/ValidationHelpers';

export class IProductFilters {
  @IsOptional()
  @IsNumberString({
    message: ValidationHelpers.compileDefaultErrorMessage('a number'),
  })
  lastId?: number;

  @IsOptional()
  @IsNumberString({
    message: ValidationHelpers.compileDefaultErrorMessage('a number'),
  })
  limit?: number;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'], {
    message: ValidationHelpers.compileDefaultErrorMessage('ASC or DESC'),
  })
  orderDirection?: string;

  @IsOptional()
  @IsNotIn(['tags'], {
    message: ValidationHelpers.compileDefaultErrorMessage('a supported value'),
  })
  orderBy?: string;
}
