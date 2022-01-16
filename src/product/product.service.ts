import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Image } from './entities/product-image.entity';
import { Product } from './entities/product.entity';
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
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (filters.lastId) {
      queryBuilder.where(
        `product.id ${filters.orderDirection === 'DESC' ? '<' : '>'} :id`,
        {
          id: filters.lastId,
        },
      );
    }
    if (filters.searchText) {
      queryBuilder.andWhere(
        'product.name ILIKE :name OR description ILIKE :description OR :tag = ANY(tags)',
        {
          name: '%' + filters.searchText + '%',
          description: '%' + filters.searchText + '%',
          tag: filters.searchText,
        },
      );
    }

    if (filters.orderBy && filters.orderDirection) {
      queryBuilder.orderBy(
        'product.' + filters.orderBy,
        filters.orderDirection,
      );
    }

    const products = await queryBuilder
      .leftJoinAndSelect('product.photos', 'image')
      .take(filters.limit)
      .getMany();

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      relations: ['photos'],
    });

    return product;
  }

  // This will be optimized, when typeorm starts support returning * in save method
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    images?: Array<Image>,
  ): Promise<Product> {
    const productToBeUpdate = await this.productRepository.findOne(id, {
      relations: ['photos'],
    });

    if (!productToBeUpdate) {
      throw new NotFoundException();
    }

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
