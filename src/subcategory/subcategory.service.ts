import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDirection } from 'src/common/enums/order-direction.enum';
import { SubcategoryFilter } from 'src/subcategory/types/subcategory-filter.type';
import { FindCondition, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryService {
  @InjectRepository(Subcategory)
  private subcategoryRepository: Repository<Subcategory>;

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryRepository.save(
      this.subcategoryRepository.create(createSubcategoryDto),
    );
  }

  async findAll(filters: SubcategoryFilter) {
    const { name, categoryId, limit, lastId, orderBy, orderDirection } =
      filters;
    const where: FindCondition<Subcategory> = {};

    if (name) {
      where.name = ILike(name + '%');
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (lastId) {
      where.id =
        orderBy && orderDirection === OrderDirection.DESC
          ? LessThan(lastId)
          : MoreThan(lastId);
    }

    return await this.subcategoryRepository.find({
      where,
      order: {
        [orderBy]: orderDirection,
      },
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.subcategoryRepository.findOne(id, {
      relations: ['category'],
    });
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    const subcategory = await this.subcategoryRepository.findOne(id);

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    Object.assign(subcategory, updateSubcategoryDto);

    return await this.subcategoryRepository.save(subcategory);
  }

  async remove(id: number) {
    return await this.subcategoryRepository.delete(id);
  }
}
