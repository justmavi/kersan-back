import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { ProductFilters } from './types/product-filter.type';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Authorize()
  @UseInterceptors(FilesInterceptor('images', 8))
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() filters: ProductFilters) {
    const products = await this.productService.findAll(filters);

    if (!products) {
      throw new NotFoundException('Product not found');
    }

    return products;
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const product = await this.productService.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Patch(':id')
  @Authorize()
  async update(
    @Param() { id }: PathParams,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IOk> {
    const result = await this.productService.update(id, updateProductDto);

    if (!result) {
      throw new NotFoundException('Product not found');
    }

    return { ok: result };
  }

  @Delete(':id')
  @Authorize()
  async remove(@Param() { id }: PathParams): Promise<IOk> {
    const result = await this.productService.remove(id);

    if (!result) {
      throw new NotFoundException('Category not found');
    }

    return { ok: result };
  }
}
