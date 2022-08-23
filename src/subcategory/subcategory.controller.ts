import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/controller.base';
import { AccessControlOptions } from 'src/common/options/acl.options';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryFilter } from './types/subcategory-filter.type';

@Controller(Subcategory.name)
export class SubcategoryController extends BaseController<
  Subcategory,
  SubcategoryFilter,
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
  SubcategoryService
>(
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
  SubcategoryFilter,
  AccessControlOptions.LevelTwo,
) {
  constructor(service: SubcategoryService) {
    super(service, Subcategory.name);
  }
}
