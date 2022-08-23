import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { AccessControlOptions } from 'src/common/options/acl.options';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryFilter } from './types/category-filter.type';

@Controller(Category.name)
export class CategoryController extends BaseController<
  Category,
  CategoryFilter,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryService
>(
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryFilter,
  AccessControlOptions.LevelTwo,
) {
  constructor(service: CategoryService) {
    super(service, Category.name);
  }
}
