import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { Roles } from 'src/common/enums/roles.enum';
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilter } from './types/user-filter.type';
import { UserService } from './user.service';

@Controller('user')
@Authorize(Roles.ROLE_ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    delete user.password;

    return user;
  }

  @Get()
  async findAll(@Query() filter: UserFilter) {
    const users = await this.userService.findAll(filter);

    return users;
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Patch(':id')
  async update(
    @Param() { id }: PathParams,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IOk> {
    const result = await this.userService.update(id, updateUserDto);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return { ok: result };
  }

  @Delete(':id')
  async remove(@Param() { id }: PathParams): Promise<IOk> {
    const result = await this.userService.remove(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return { ok: result };
  }
}
