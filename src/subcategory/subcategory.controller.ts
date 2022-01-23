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
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryFilter } from './types/subcategory-filter.type';

@Controller('subcategory')
@Authorize(Roles.ROLE_ADMIN)
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryService.create(createSubcategoryDto);
  }

  @Get()
  async findAll(@Query() filters: SubcategoryFilter) {
    return await this.subcategoryService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const subcategory = await this.subcategoryService.findOne(id);

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    return subcategory;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return await this.subcategoryService.update(id, updateSubcategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.subcategoryService.remove(id);
  }
}
