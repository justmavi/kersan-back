import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsInt()
  public role: number;
}
