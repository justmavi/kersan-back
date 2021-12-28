import {
  DeleteResult,
  FindManyOptions,
  LessThan,
  MoreThan,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { IProductFilters } from './types/IProductFilters';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.save(createProductDto);
    return product;
  }

  async findAll(filters?: IProductFilters): Promise<Product[]> {
    const findFilters: FindManyOptions<Product> = {};
    const lastId = filters.lastId ?? 0;

    findFilters.take = filters.limit ?? 20;
    findFilters.where = {
      id:
        filters.orderDirection === 'DESC' ? LessThan(lastId) : MoreThan(lastId),
    };
    if (filters.orderBy && filters.orderDirection)
      findFilters.order = { [filters.orderBy]: filters.orderDirection };

    const products = await this.productRepository.find(findFilters);
    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    const updateResult = await this.productRepository.update(
      id,
      updateProductDto,
    );
    return updateResult;
  }

  async remove(id: number): Promise<DeleteResult> {
    const deleteResult = await this.productRepository.delete(id);
    return deleteResult;
  }
}
