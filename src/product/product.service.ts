import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDirection } from 'src/common/enums/order-direction.enum';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Image } from './entities/product-image.entity';
import { Product } from './entities/product.entity';
import { ProductFilters } from './types/product-filter.type';

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

    const product = await this.productRepository.save(
      this.productRepository.create(productToBeCreated),
    );

    return product;
  }

  async findAll(filters?: ProductFilters): Promise<Product[]> {
    const { lastId, searchText, orderBy, orderDirection, limit } = filters;
    const queryBuilder = this.productRepository.createQueryBuilder('product');

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
      throw new NotFoundException('Product not found');
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
