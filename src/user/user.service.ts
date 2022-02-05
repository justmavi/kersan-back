import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDirection } from 'src/common/enums/order-direction.enum';
import { FindCondition, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserFilter } from './types/user-filter.type';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );
  }

  async findAll(filter: UserFilter) {
    const {
      firstName,
      lastName,
      email,
      role,
      limit,
      lastId,
      orderBy,
      orderDirection,
    } = filter;
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

    if (role) {
      where.role = role;
    }

    where.id =
      orderBy && orderDirection === OrderDirection.DESC
        ? LessThan(lastId)
        : MoreThan(lastId);

    const users = await this.userRepository.find({
      where,
      order: { [orderBy]: orderDirection },
      take: limit,
    });

    return users;
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne(
      { email },
      { select: ['password', 'id', 'email', 'firstName', 'lastName'] },
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const result = await this.userRepository.update(
      id,
      this.userRepository.create(updateUserDto), // need for BeforeUpdate() working
    );

    return !!result.affected;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);

    return !!result.affected;
  }
}
