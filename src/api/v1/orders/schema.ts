import { z } from "zod";

export const schema = {
  createOrder: z.object({
    body: z.object({
      items: z.array(z.object({
        itemId: z.string().uuid(),
        quantity: z.number().min(1),
      })),
    })
  })
};