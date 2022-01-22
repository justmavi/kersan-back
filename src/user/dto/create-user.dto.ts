import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Roles } from 'src/common/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsNumber()
  public role: Roles;
}
