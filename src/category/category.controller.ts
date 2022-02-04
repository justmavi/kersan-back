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
import { IOk } from 'src/common/types/ok.type';
import { PathParams } from 'src/common/types/path-params.type';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFilter } from './types/category-filter.type';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Authorize(Roles.ROLE_ADMIN)
  @Get()
  async findAll(@Query() filter: CategoryFilter) {
    const categories = await this.categoryService.findAll(filter);

    if (!categories) {
      throw new NotFoundException('Category not found');
    }

    return categories;
  }

  @Get(':id')
  async findOne(@Param() { id }: PathParams) {
    const category = await this.categoryService.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  @Patch(':id')
  @Authorize(Roles.ROLE_ADMIN)
  async update(
    @Param() { id }: PathParams,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<IOk> {
    const result = await this.categoryService.update(id, updateCategoryDto);

    if (!result) {
      throw new NotFoundException('Category not found');
    }

    return { ok: result };
  }

  @Delete(':id')
  @Authorize(Roles.ROLE_ADMIN)
  async remove(@Param() { id }: PathParams): Promise<IOk> {
    const result = await this.categoryService.remove(id);

    if (!result) {
      throw new NotFoundException('Category not found');
    }

    return { ok: result };
  }
}
