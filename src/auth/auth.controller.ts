import {
  Body,
  Controller,
  Get,
  GoneException,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import { IOk } from 'src/common/types/ok.type';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { PassResetEndDto } from './dto/pass-reset-end.dto';
import { PassResetStartDto } from './dto/pass-reset-start.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  whoami(@Request() req) {
    return req.user;
  }

  @Post('resetpassword')
  @HttpCode(HttpStatus.OK)
  async startPasswordResetOperation(
    @Body() { username: email }: PassResetStartDto,
  ): Promise<IOk> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const hash = this.authService.generatePasswordResetHash(user);
      await this.authService.savePasswordResetHash(user, hash);

      // TODO: send mail
    }

    return { ok: true };
  }

  @Get('password/:hash')
  async checkPasswordResetHashIsValid(
    @Param('hash') hash: string,
  ): Promise<IOk> {
    const passResetHash = await this.authService.getPasswordResetHashInstance(
      hash,
    );

    if (!passResetHash) {
      throw new NotFoundException('Hash not found');
    }

    if (passResetHash.expiresIn < DateTime.now().toJSDate()) {
      throw new GoneException('Hash was expired');
    }

    return { ok: true };
  }

  @Post('password/:hash')
  @HttpCode(HttpStatus.OK)
  async endPasswordResetOperation(
    @Param('hash') hash: string,
    @Body() { newPassword }: PassResetEndDto,
  ): Promise<IOk> {
    const passResetHash = await this.authService.getPasswordResetHashInstance(
      hash,
    );

    if (!passResetHash) {
      throw new NotFoundException('Hash not found');
    }

    if (passResetHash.expiresIn < DateTime.now().toJSDate()) {
      throw new GoneException('Hash was expired');
    }

    await this.userService.update(passResetHash.userId, {
      password: newPassword,
    });
    await this.authService.deletePasswordResetHash(hash);

    return { ok: true };
  }
}
