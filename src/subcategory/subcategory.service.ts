import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { SubcategoryFilter } from 'src/subcategory/types/subcategory-filter.type';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryService extends BaseService<
  Subcategory,
  SubcategoryFilter,
  CreateSubcategoryDto,
  UpdateSubcategoryDto
> {
  constructor(
    @InjectRepository(Subcategory) repository: Repository<Subcategory>,
  ) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filter: SubcategoryFilter,
  ): FindManyOptions<Subcategory> {
    const where: FindOptionsWhere<Subcategory> = {};

    if (filter.name) where.name = ILike(filter.name + '%');
    if (filter.categorySlug) where.category = { slug: filter.categorySlug };
    if (filter.categoryId) where.categoryId = filter.categoryId;

    const opts = attachPagination<Subcategory>(filter);
    Object.assign(opts.where, where);

    return opts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Subcategory> {
    return {
      category: true,
    };
  }
}
