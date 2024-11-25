import { z } from 'zod';

// Define Zod schema for query parameters

export const schema = {
  groceryQuerySchema: z.object({
    query: z.object({
      name: z.string().optional(),
      minPrice: z.string().regex(/^\d+(\.\d{1,2})?$/u, "Must be a valid number").optional(),
      maxPrice: z.string().regex(/^\d+(\.\d{1,2})?$/u, "Must be a valid number").optional(),
      page: z.string().regex(/^\d+$/u, "Must be a valid integer").default("1"),
      limit: z.string().regex(/^\d+$/u, "Must be a valid integer").default("10"),
      sortField: z.enum(["price", "created_at", "name"]).default("created_at"),
      sortOrder: z.enum(["asc", "desc"]).default("asc"),
      status: z.enum(["ACTIVE", "INACTIVE", "DELETED", "OUT_OF_STOCK"]).optional(),
    })
  })
}
