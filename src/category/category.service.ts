import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDirection } from 'src/common/enums/order-direction.enum';
import { FindCondition, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryFilter } from './types/category-filter.type';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private categoryRepository: Repository<Category>;

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(
      this.categoryRepository.create(createCategoryDto),
    );
  }

  async findAll(filter: CategoryFilter) {
    const { name, limit, lastId, orderBy, orderDirection } = filter;
    const where: FindCondition<Category> = {};

    if (name) {
      where.name = ILike(name + '%');
    }

    where.id =
      orderBy && orderDirection === OrderDirection.DESC
        ? LessThan(lastId)
        : MoreThan(lastId);

    return await this.categoryRepository.find({
      where,
      order: { [orderBy]: orderDirection },
      take: limit,
      relations: ['subcategories'],
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne(id, {
      relations: ['subcategories'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    Object.assign(category, updateCategoryDto);

    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
