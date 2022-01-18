import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from '../enums/roles.enum';

export const Authorize = (role: Roles = Roles.ROLE_MODERATOR) =>
  applyDecorators(
    UseGuards(JwtAuthGuard),
    SetMetadata('role', role),
    UseGuards(RolesGuard),
  );
