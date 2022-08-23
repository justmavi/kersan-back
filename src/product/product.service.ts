import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/service.base';
import { attachPagination } from 'src/common/helpers/pagination.helper';
import { PropertyHelpers } from 'src/common/helpers/property.helper';
import {
  Between,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Raw,
  Repository,
} from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductFilter } from './types/product-filter.type';

@Injectable()
export class ProductService extends BaseService<
  Product,
  ProductFilter,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(@InjectRepository(Product) repository: Repository<Product>) {
    super(repository);
  }

  protected getFiltersConfiguration(
    filter: ProductFilter,
  ): FindManyOptions<Product> {
    const where: FindOptionsWhere<Product> = {};
    const isEmpty = PropertyHelpers.isNullOrUndefined;

    if (filter.searchText) {
      where.name = Raw(
        (alias) =>
          `(${alias} ILIKE :name OR description ILIKE :description OR :tag = ANY(tags))`,
        {
          name: '%' + filter.searchText + '%',
          description: '%' + filter.searchText + '%',
          tag: filter.searchText,
        },
      );
    }
    if (filter.categorySlug) where.category = { slug: filter.categorySlug };
    if (filter.subcategorySlug)
      where.subcategory = { slug: filter.subcategorySlug };
    if (filter.categoryId) where.categoryId = filter.categoryId;
    if (filter.subcategoryId) where.subcategoryId = filter.subcategoryId;
    if (!isEmpty(filter.priceStart) && !isEmpty(filter.priceEnd))
      where.newPrice = Between(filter.priceStart, filter.priceEnd);
    if (!isEmpty(filter.contains)) where.contains = filter.contains;

    const opts = attachPagination<Product>(filter);
    Object.assign(opts.where, where);

    return opts;
  }
  protected getRelationsConfiguration(): FindOptionsRelations<Product> {
    return {
      category: true,
      subcategory: true,
      photos: true,
    };
  }
}
