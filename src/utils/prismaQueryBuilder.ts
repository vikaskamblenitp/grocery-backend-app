import { Prisma } from "@prisma/client";

interface QueryOptions<TWhereInput, TOrderFields extends string> {
  filters?: Prisma.Enumerable<TWhereInput>;
  pagination?: { page: number; limit: number };
  sort?: { field: TOrderFields; order: 'asc' | 'desc' };
}

export function buildPrismaQuery<TWhereInput, TOrderFields extends string>(
  options: QueryOptions<TWhereInput, TOrderFields>
): {
  where?: TWhereInput;
  take?: number;
  skip?: number;
  orderBy?: { [key in TOrderFields]?: 'asc' | 'desc' };
} {
  const { filters, pagination, sort } = options;

  // Combine filters
  const where = filters ? ({ AND: filters } as unknown as TWhereInput) : undefined;

  // Pagination
  const take = pagination?.limit;
  const skip = pagination ? (pagination.page - 1) * pagination.limit : undefined;

  // Sorting
  const orderBy = sort
    ? ({ [sort.field]: sort.order } as { [key in TOrderFields]?: 'asc' | 'desc' })
    : undefined;

  return { where, take, skip, orderBy };
}
