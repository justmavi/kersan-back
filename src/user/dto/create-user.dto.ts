import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { PasswordValidation } from 'class-validator-password-check/lib';
import { Roles } from 'src/common/enums/roles.enum';
import {
  PasswordMaxLength,
  PasswordMinLength,
  PasswordRequirements,
} from 'src/common/options/password-validator.options';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  public slug: string;

  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(PasswordMinLength)
  @MaxLength(PasswordMaxLength)
  @Validate(PasswordValidation, [PasswordRequirements])
  public password: string;

  @IsInt()
  public role: Roles;
}
