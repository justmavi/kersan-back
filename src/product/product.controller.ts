import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Image } from './entities/product_image.entity';
import { ProductService } from './product.service';
import { IProductFilters } from './types/IProductFilters';

// There is no way to use environment variables in decorators
let maxUploadsPerRequest: number;

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly configService: ConfigService,
  ) {
    maxUploadsPerRequest = this.configService.get<number>(
      'global.maxUploadsPerRequest',
    );
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', maxUploadsPerRequest))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const photos = images?.map((item) => {
      const image = new Image();
      image.name = item.filename;
      image.realName = item.originalname;
      image.path = item.path;

      return image;
    });

    return await this.productService.create(createProductDto, photos);
  }

  @Get()
  async findAll(@Query() filters: IProductFilters) {
    return await this.productService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', maxUploadsPerRequest))
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const photos = images?.map((image) => image.path);
    // updateProductDto.images = photos;

    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.productService.remove(id);
  }
}
