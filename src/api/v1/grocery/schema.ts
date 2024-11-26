import { z } from 'zod';

export const schema = {
  getAllGroceryItems: z.object({
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
  }),

  addGroceryItemSchema: z.object({
    body: z.object({
      name: z.string().min(3).max(255),
      price: z.number().min(0.01),
      quantity: z.number().min(1),
      description: z.string().min(3).max(255).optional(),
      image_url: z.string().url().optional(),
    })
  }),

  getGroceryItemById: z.object({
    params: z.object({
      itemID: z.string().uuid(),
    })
  }),

  updateGroceryItem: z.object({
    params: z.object({
      itemID: z.string().uuid(),
    }),
    body: z.object({
      name: z.string().optional(),
      price: z.number().min(0.01).optional(),
      image_url: z.string().url().optional(),
      description: z.string().min(3).max(255).optional(),
      status: z.enum(["ACTIVE", "INACTIVE", "DELETED", "OUT_OF_STOCK"]).optional(),
    })
  }),

  deleteGroceryItem: z.object({
    params: z.object({
      itemID: z.string().uuid(),
    })
  }),

  adjustStock: z.object({
    params: z.object({
      itemID: z.string().uuid(),
    }),
    body: z.object({
      quantity: z.number().min(1),
      action: z.enum(["increase", "decrease"]),
    })
  })
}
