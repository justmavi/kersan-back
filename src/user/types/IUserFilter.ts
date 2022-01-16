import { IsEnum, IsOptional, IsString } from 'class-validator';

export class IUserFilter {
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
  @IsEnum([])
  public role?: string;
}
