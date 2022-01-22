import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/common/enums/roles.enum';
import { Pagination } from 'src/common/types/pagination.type';

export class UserFilter extends Pagination {
  @IsOptional()
  @IsString()
  public firstName?: string;

  @IsOptional()
  @IsString()
  public lastName?: string;

  @IsOptional()
  @IsString()
  public email?: string;

  @IsOptional()
  @IsNumberString()
  public role?: Roles;
}
