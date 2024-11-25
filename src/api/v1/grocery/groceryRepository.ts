import { ERROR_CODES, GROCERY_ITEM_STATUS } from "#constants";
import { prisma } from "#helpers/prismaClient";
import { data_items as GroceryItem, Prisma } from "@prisma/client";
import { GroceryItemApiError } from "./error";
import { StatusCodes } from "http-status-codes";
import { buildPrismaQuery } from "#utils/prismaQueryBuilder";


export class GroceryRepository {
  findAll(payload) {
    console.log(payload);

    const queryOptions = buildPrismaQuery<
      Prisma.data_itemsWhereInput,
      keyof Prisma.data_itemsOrderByWithRelationInput
    >(payload);

    console.log(queryOptions);
    
    return prisma.data_items.findMany({
      where: queryOptions.where,
      take: queryOptions.take,
      skip: queryOptions.skip,
      orderBy: queryOptions.orderBy as Prisma.data_itemsOrderByWithRelationInput,
    });
  }

  async findById(id: string) {
    const item = await prisma.data_items.findUnique({ where: { id } });

    if (!item) throw new GroceryItemApiError(`Item with ID ${id} not found`, StatusCodes.NOT_FOUND, ERROR_CODES.NOT_FOUND);

    return item;
  }

  create(data: Omit<GroceryItem, "created_at" | "updated_at">) {
    return prisma.$transaction([
      prisma.data_items.create({ data }),
      prisma.data_items_status_history.create({ data: { item_id: data.id, status: data.status } }),
    ]);
  }

  update(id: string, data: Partial<GroceryItem>) {
    return prisma.data_items.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.data_items.delete({ where: { id } });
  }

  updateStatus(id: string, status: GroceryItem["status"]) {
    return prisma.$transaction([
      prisma.data_items.update({ where: { id }, data: { status } }),
      prisma.data_items_status_history.create({ data: { item_id: id, status } }),
    ])
  }

  updateStock(id: string, quantity: number) {
    return prisma.$transaction(async (tx) => {
      const updatedItem = await prisma.data_items.update({
        where: { id },
        data: { quantity }
      });

      if (updatedItem.quantity === 0) {
        await tx.data_items.update({
          where: { id },
          data: { status: GROCERY_ITEM_STATUS.OUT_OF_STOCK as GroceryItem["status"] }
        });

        await tx.data_items_status_history.create({
          data: { item_id: id, status: GROCERY_ITEM_STATUS.OUT_OF_STOCK as GroceryItem["status"] }
        });
      }
    });
  }

  async getStock(id: string) {
    const item = await prisma.data_items.findUnique({ where: { id }, select: { quantity: true } });
    if (!item) throw new GroceryItemApiError(`Item with ID ${id} not found`, StatusCodes.NOT_FOUND, ERROR_CODES.NOT_FOUND);
    return item.quantity;
  }
}
