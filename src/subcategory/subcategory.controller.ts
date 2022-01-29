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
} from '@nestjs/common';
import { Authorize } from 'src/common/decorators/authorize.decorator';
import { Roles } from 'src/common/enums/roles.enum';
import { PathParams } from 'src/common/types/path-params.type';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryFilter } from './types/subcategory-filter.type';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  @Authorize(Roles.ROLE_ADMIN)
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryService.create(createSubcategoryDto);
  }

  @Get()
  async findAll(@Query() filters: SubcategoryFilter) {
    const subcategories = await this.subcategoryService.findAll(filters);

    if (!subcategories) {
      throw new NotFoundException('Subcategory not found');
    }

    return subcategories;
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const subcategory = await this.subcategoryService.findOne(id);

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    return subcategory;
  }

  @Patch(':id')
  @Authorize(Roles.ROLE_ADMIN)
  async update(
    @Param() { id }: PathParams,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return await this.subcategoryService.update(id, updateSubcategoryDto);
  }

  @Delete(':id')
  @Authorize(Roles.ROLE_ADMIN)
  async remove(@Param() { id }: PathParams) {
    return await this.subcategoryService.remove(id);
  }
}
