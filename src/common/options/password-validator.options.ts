import { PasswordValidationRequirement } from 'class-validator-password-check';

export const PasswordRequirements: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

export const PasswordMinLength = 8;
export const PasswordMaxLength = 64;
