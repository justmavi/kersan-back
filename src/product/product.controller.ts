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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Image } from './entities/product-image.entity';
import { ProductService } from './product.service';
import { ProductFilters } from './types/product-filter.type';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Authorize()
  @UseInterceptors(FilesInterceptor('images', 8))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const photos = images?.map((item) => new Image(item));

    return await this.productService.create(createProductDto, photos);
  }

  @Get()
  async findAll(@Query() filters: ProductFilters) {
    return await this.productService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productService.findOne(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Patch(':id')
  @Authorize()
  @UseInterceptors(FilesInterceptor('images', 8))
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const photos = images?.map((item) => new Image(item));

    return await this.productService.update(id, updateProductDto, photos);
  }

  @Delete(':id')
  @Authorize()
  async remove(@Param('id') id: number) {
    return await this.productService.remove(id);
  }
}
