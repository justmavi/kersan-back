import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Roles } from 'src/common/enums/roles.enum';
import { Pagination } from 'src/common/types/pagination.type';

export class UserFilter extends Pagination {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public lastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public email?: string;

  @IsOptional()
  @IsInt()
  @Min(Roles.NO_ROLE)
  @Max(Roles.ROLE_ADMIN)
  public role?: Roles;
}
