import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

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
}
