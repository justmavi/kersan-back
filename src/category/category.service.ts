import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryFilter } from './types/category-filter.type';

@Injectable()
export class CategoryService extends BaseService<
  Category,
  CategoryFilter,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(@InjectRepository(Category) repository: Repository<Category>) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filter: CategoryFilter,
  ): FindManyOptions<Category> {
    const where: FindOptionsWhere<Category> = {};

    if (filter.name) where.name = ILike(filter.name + '%');

    const opts = attachPagination<Category>(filter);
    Object.assign(opts.where, where);

    return opts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Category> {
    return {
      subcategories: true,
    };
  }
}
