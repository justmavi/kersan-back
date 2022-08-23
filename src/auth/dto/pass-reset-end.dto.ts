import { IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { PasswordValidation } from 'class-validator-password-check';
import {
  PasswordMaxLength,
  PasswordMinLength,
  PasswordRequirements,
} from 'src/common/options/password-validator.options';

export class PassResetEndDto {
  @IsString()
  @MinLength(PasswordMinLength)
  @MaxLength(PasswordMaxLength)
  @Validate(PasswordValidation, [PasswordRequirements])
  public newPassword: string;
}
