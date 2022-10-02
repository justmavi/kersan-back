import { FindManyOptions, LessThan, MoreThan } from 'typeorm';
import { OrderDirection } from '../enums/order-direction.enum';
import { Pagination } from '../types/pagination.type';

export function attachPagination<T>(opts: Pagination): FindManyOptions<T> {
  const conditions: FindManyOptions = {
    take: opts.limit,
    order: {
      [opts.orderBy]: opts.orderDirection,
    },
    where: {
      id:
        opts.orderBy &&
        opts.lastId &&
        opts.orderDirection === OrderDirection.DESC
          ? LessThan(opts.lastId)
          : MoreThan(opts.lastId),
    },
  };

  return conditions;
}

export function detachPagination<T>(
  findManyOptions: FindManyOptions<T>,
  opts?: { ignoreOrder: boolean },
) {
  delete findManyOptions.skip;
  delete findManyOptions.where['id'];

  if (!opts?.ignoreOrder) {
    delete findManyOptions.order;
  }
}
