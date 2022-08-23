import {
  DeepPartial,
  FindManyOptions,
  FindOptionsRelations,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './entity.base';

export abstract class BaseService<
  T extends BaseEntity,
  TFilter,
  TCreate extends DeepPartial<T>,
  TUpdate extends QueryDeepPartialEntity<T>,
> {
  constructor(protected readonly repository: Repository<T>) {}

  public async create(model: TCreate): Promise<T> {
    const entity = this.repository.create(model);
    return await this.repository.save(entity);
  }

  public async findAll(filters: TFilter): Promise<T[]> {
    const filtersConfiguration = this.getFiltersConfiguration(filters);
    filtersConfiguration.relations = this.getRelationsConfiguration();

    return await this.repository.find(filtersConfiguration);
  }

  public async findOne(slug: string): Promise<T> {
    const relations = this.getRelationsConfiguration();

    const [result] = await this.repository.find({
      where: { slug: slug as any },
      relations,
    });

    return result;
  }

  public async remove(idOrIds: number | number[]): Promise<boolean> {
    const result = await this.repository.delete(idOrIds);

    return !!result.affected;
  }

  public async update(id: number, dto: TUpdate): Promise<boolean> {
    const result = await this.repository.update(id, dto);

    return !!result.affected;
  }

  protected abstract getFiltersConfiguration(
    filter: TFilter,
  ): FindManyOptions<T>;
  protected abstract getRelationsConfiguration(): FindOptionsRelations<T>;
}
