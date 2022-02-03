import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { DateTime } from 'luxon';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordResetHash } from './entities/pass-reset-hash.entity';

@Injectable()
export class AuthService {
  @InjectRepository(PasswordResetHash)
  private readonly passResetHashRepository: Repository<PasswordResetHash>;

  constructor(private readonly jwtService: JwtService) {}
  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  async login(user: User) {
    const { id: sub, email } = user;
    const token = await this.jwtService.signAsync({ sub, email });

    return {
      access_token: token,
    };
  }

  generatePasswordResetHash(user: User) {
    const currentDate = DateTime.now().toString();
    const randomNumber = Math.random().toString();

    return createHash('md5')
      .update(currentDate + randomNumber + JSON.stringify(user))
      .digest('hex');
  }

  async savePasswordResetHash(user: User, hash: string): Promise<void> {
    const passResetHash = new PasswordResetHash();
    passResetHash.user = user;
    passResetHash.hash = hash;
    passResetHash.expiresIn = DateTime.now().plus({ hour: 1 }).toJSDate();

    await this.passResetHashRepository.upsert(passResetHash, {
      conflictPaths: ['userId'],
    });
  }

  async getPasswordResetHashInstance(hash: string, includeUser = false) {
    return await this.passResetHashRepository.findOne({
      where: { hash },
      relations: includeUser ? ['user'] : null,
    });
  }

  async deletePasswordResetHash(hash: string) {
    return await this.passResetHashRepository.delete({ hash });
  }
}
