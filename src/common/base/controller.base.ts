import {
  Body,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Type,
  UsePipes,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Authorize } from '../decorators/authorize.decorator';
import { AccessControlOptions } from '../options/acl.options';
import { ValidationPipeOptions } from '../options/validation-pipe.options';
import { AccessMethods } from '../types/access-methods.type';
import { AccesssControlList } from '../types/acl.type';
import { GenericValidationPipe } from '../types/generic-validation-pipe.type';
import { IOk } from '../types/ok.type';
import { PathParamId, PathParamSlug } from '../types/path-params.type';
import { BaseEntity } from './entity.base';
import { BaseService } from './service.base';

export function BaseController<
  TEntity extends BaseEntity,
  TFilter,
  TCreateDto extends DeepPartial<TEntity>,
  TUpdateDto extends QueryDeepPartialEntity<TEntity>,
  TService extends BaseService<TEntity, TFilter, TCreateDto, TUpdateDto>,
>(
  createDto: Type<TCreateDto>,
  updateDto: Type<TUpdateDto>,
  filter: Type<TFilter>,
  acl: AccesssControlList = AccessControlOptions.LevelZero,
) {
  abstract class LocalBaseController {
    constructor(
      protected readonly service: TService,
      protected readonly resourceName: string = 'Data',
    ) {}

    @Post()
    @UsePipes(
      new GenericValidationPipe(ValidationPipeOptions, { body: createDto }),
    )
    @Authorize(acl[AccessMethods.POST])
    async create(@Body() dto: TCreateDto): Promise<TEntity> {
      return await this.service.create(dto);
    }

    @Get()
    @UsePipes(
      new GenericValidationPipe(ValidationPipeOptions, { query: filter }),
    )
    @Authorize(acl[AccessMethods.GET])
    async findAll(@Query() filters: TFilter) {
      return await this.service.findAll(filters);
    }

    @Get(':slug')
    @Authorize(acl[AccessMethods.GET])
    async findOne(@Param() { slug }: PathParamSlug) {
      const result = await this.service.findOne(slug);

      if (!result) {
        throw new NotFoundException(`${this.resourceName} not found`);
      }

      return result;
    }

    @Put(':id')
    @UsePipes(
      new GenericValidationPipe(ValidationPipeOptions, { body: updateDto }),
    )
    @Authorize(acl[AccessMethods.PUT])
    async update(
      @Param() { id }: PathParamId,
      @Body() dto: TUpdateDto,
    ): Promise<IOk> {
      const result = await this.service.update(id, dto);

      if (!result) {
        throw new NotFoundException(`${this.resourceName} not found`);
      }

      return { ok: true };
    }

    @Delete(':id')
    @Authorize(acl[AccessMethods.DELETE])
    async remove(@Param() { id }: PathParamId): Promise<IOk> {
      const result = await this.service.remove(id);

      if (!result) {
        throw new NotFoundException(`${this.resourceName} not found`);
      }

      return { ok: true };
    }
  }

  return LocalBaseController;
}
