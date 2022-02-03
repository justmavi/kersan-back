import { IsEmail } from 'class-validator';

export class PassResetStartDto {
  @IsEmail()
  public username: string;
}
