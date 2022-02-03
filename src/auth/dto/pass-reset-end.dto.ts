import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PassResetEndDto {
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-\_\(\)]).{8,}$/g,
    {
      message:
        'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric value and 1 special character',
    },
  )
  public newPassword: string;
}
