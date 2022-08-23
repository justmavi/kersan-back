import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { AccessControlOptions } from 'src/common/options/acl.options';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserFilter } from './types/user-filter.type';
import { UserService } from './user.service';

@Controller(User.name)
export class UserController extends BaseController<
  User,
  UserFilter,
  CreateUserDto,
  UpdateUserDto,
  UserService
>(CreateUserDto, UpdateUserDto, UserFilter, AccessControlOptions.LevelFive) {
  constructor(service: UserService) {
    super(service, User.name);
  }
}
