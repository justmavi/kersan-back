import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDirection } from 'src/common/enums/order-direction.enum';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductFilters } from './types/product-filter.type';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const productToBeCreated = new Product(createProductDto);

    const product = await this.productRepository.save(
      this.productRepository.create(productToBeCreated),
    );

    return product;
  }

  async findAll(filters?: ProductFilters): Promise<Product | Product[]> {
    const {
      slug,
      lastId,
      searchText,
      orderBy,
      orderDirection,
      limit,
      categoryId,
      subcategoryId,
    } = filters;
    if (slug) {
      return await this.productRepository.findOne({
        where: { slug },
        relations: ['photos', 'category', 'subcategory'],
      });
    }

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (lastId) {
      queryBuilder.where(
        `product.id ${
          filters.orderBy && filters.orderDirection === OrderDirection.DESC
            ? '<'
            : '>'
        } :id`,
        {
          id: lastId,
        },
      );
    }

    if (searchText) {
      queryBuilder.andWhere(
        'product.name ILIKE :name OR description ILIKE :description OR :tag = ANY(tags)',
        {
          name: '%' + searchText + '%',
          description: '%' + searchText + '%',
          tag: searchText,
        },
      );
    }

    if (categoryId) {
      queryBuilder.andWhere('categoryId = :categoryId', { categoryId });
    }

    if (subcategoryId) {
      queryBuilder.andWhere('subcategoryId = :subcategoryId', {
        subcategoryId,
      });
    }

    queryBuilder.orderBy('product.' + orderBy, orderDirection);

    const products = await queryBuilder
      .leftJoinAndSelect('product.photos', 'image')
      .take(limit)
      .getMany();

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      relations: ['photos', 'category', 'subcategory'],
    });

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const productToBeUpdate = await this.productRepository.findOne(id, {
      relations: ['photos'],
    });

    if (!productToBeUpdate) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(productToBeUpdate, updateProductDto);

    return await this.productRepository.save(productToBeUpdate);
  }

  async remove(id: number): Promise<DeleteResult> {
    const deleteResult = await this.productRepository.delete(id);
    return deleteResult;
  }
}
