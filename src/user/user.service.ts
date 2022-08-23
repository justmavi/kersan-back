import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { PropertyHelpers } from 'src/common/helpers/property.helper';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserFilter } from './types/user-filter.type';

@Injectable()
export class UserService extends BaseService<
  User,
  UserFilter,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({
      where: { email },
      select: {
        password: true,
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async findById(id: number) {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const result = await this.repository.update(
      id,
      this.repository.create(updateUserDto), // need for BeforeUpdate() working
    );

    return !!result.affected;
  }

  protected getFiltersConfiguration(filter: UserFilter): FindManyOptions<User> {
    const where: FindOptionsWhere<User> = {};
    const isEmpty = PropertyHelpers.isNullOrUndefined;

    if (filter.firstName) where.firstName = ILike(filter.firstName + '%');
    if (filter.lastName) where.lastName = ILike(filter.lastName + '%');
    if (filter.email) where.email = ILike(filter.email + '%');
    if (!isEmpty(filter.role)) where.role = filter.role;

    const opts = attachPagination<User>(filter);
    Object.assign(opts.where, where);

    return opts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<User> {
    return {};
  }
}
