import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDirection } from 'src/common/enums/order-direction.enum';
import { IOk } from 'src/common/types/ok.type';
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
    const { slug, name, limit, lastId, orderBy, orderDirection } = filter;

    if (slug) {
      return await this.categoryRepository.findOne({
        where: { slug },
        relations: ['subcategories'],
      });
    }

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

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<IOk> {
    const category = await this.categoryRepository.update(
      id,
      this.categoryRepository.create(updateCategoryDto),
    );

    if (!category.affected) {
      throw new NotFoundException('Category not found');
    }

    return { ok: true };
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
