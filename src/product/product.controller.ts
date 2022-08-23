import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { AccessControlOptions } from 'src/common/options/acl.options';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductFilter } from './types/product-filter.type';

@Controller(Product.name)
export class ProductController extends BaseController<
  Product,
  ProductFilter,
  CreateProductDto,
  UpdateProductDto,
  ProductService
>(
  CreateProductDto,
  UpdateProductDto,
  ProductFilter,
  AccessControlOptions.LevelOne,
) {
  constructor(service: ProductService) {
    super(service, Product.name);
  }
}
