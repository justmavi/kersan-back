import { DeleteResult, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Image } from './entities/product_image.entity';
import { IProductFilters } from './types/IProductFilters';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;
  @InjectRepository(Image)
  private readonly imageRepository: Repository<Image>;

  async create(
    createProductDto: CreateProductDto,
    images?: Array<Image>,
  ): Promise<Product> {
    const productToBeCreated = new Product(createProductDto);

    if (images) {
      productToBeCreated.photos = await this.imageRepository.save(images);
    }

    const product = await this.productRepository.save(productToBeCreated);

    return product;
  }

  async findAll(filters?: IProductFilters): Promise<Product[]> {
    const limit = filters.limit ?? 20;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (filters.lastId) {
      queryBuilder.where(
        `id ${filters.orderDirection === 'DESC' ? '<' : '>'} :id`,
        {
          id: filters.lastId,
        },
      );
    }
    if (filters.searchText) {
      queryBuilder.andWhere('name LIKE :name OR :tag = ANY(tags)', {
        name: filters.searchText + '%',
        tag: filters.searchText,
      });
    }

    if (filters.orderBy && filters.orderDirection) {
      queryBuilder.orderBy(filters.orderBy, filters.orderDirection);
    }

    const products = await queryBuilder
      .leftJoinAndSelect('product.photos', 'image')
      .limit(limit)
      .getMany();

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      relations: ['photos'],
    });
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    images?: Array<Image>,
  ): Promise<Product> {
    const productToBeUpdate = await this.productRepository.findOne(id, {
      relations: ['photos'],
    });

    Object.assign(productToBeUpdate, updateProductDto, {
      deletedImages: undefined,
    });

    if (images) {
      const photos = await this.imageRepository.save(images);

      if (!Array.isArray(productToBeUpdate.photos)) {
        productToBeUpdate.photos = new Array<Image>();
      }

      productToBeUpdate.photos.push(...photos);
    }

    if (updateProductDto.deletedImages?.length) {
      productToBeUpdate.photos = productToBeUpdate.photos.filter(
        (item) => !updateProductDto.deletedImages.includes(item.id),
      );

      await this.imageRepository.delete(updateProductDto.deletedImages);
    }

    const updateResult = await this.productRepository.save(productToBeUpdate);

    return updateResult;
  }

  async remove(id: number): Promise<DeleteResult> {
    const deleteResult = await this.productRepository.delete(id);
    return deleteResult;
  }
}
