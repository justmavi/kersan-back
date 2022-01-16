import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindCondition, ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUserFilter } from './types/user-filter.type';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor(private readonly configService: ConfigService) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(
      password,
      this.configService.get<number>('hash.rounds'),
    );

    createUserDto.password = hashedPassword;
    return await this.userRepository.save(createUserDto);
  }

  async findAll(filter: IUserFilter) {
    const { firstName, lastName, email } = filter;
    const where: FindCondition<User> = {};

    if (firstName) {
      where.firstName = ILike(firstName + '%');
    }

    if (lastName) {
      where.lastName = ILike(lastName + '%');
    }

    if (email) {
      where.email = ILike(email + '%');
    }

    const users = await this.userRepository.find({ where });

    return users;
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;

    if (password) {
      const hashedPassword = await bcrypt.hash(
        password,
        this.configService.get<number>('hash.rounds'),
      );

      updateUserDto.password = hashedPassword;
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
