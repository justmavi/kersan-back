import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Roles } from 'src/common/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-\_\(\)]).{8,}$/g,
    {
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 numeric value and 1 special character',
    },
  )
  public password: string;

  @IsInt()
  public role: Roles;
}
