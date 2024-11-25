import { prisma } from "#helpers/prismaClient";
import { StatusCodes } from "http-status-codes";
import { OrdersApiError } from "./error";
import { ERROR_CODES } from "#constants";

class Orders {
  async create(userId: string, data: { items: { itemId: string, quantity: number }[] }) {
    const itemQuantities = data.items.reduce((acc, item) => {
      acc[item.itemId] = item.quantity;
      return acc;
    }, {});

    // Create order
    await prisma.$transaction(async tx => {
      // Check if all items are valid
      const itemsData = await Promise.all(data.items.map(async item => {
        const itemData = await tx.data_items.findUnique({
          where: { id: item.itemId, status: "ACTIVE" }
        });

        if (!itemData) {
          throw new OrdersApiError("Item not found", StatusCodes.NOT_FOUND, ERROR_CODES.NOT_ALLOWED);
        }

        if (itemData.quantity < item.quantity) {
          throw new OrdersApiError(`Only ${itemData.quantity} ${itemData.name} are in stock`, StatusCodes.BAD_REQUEST, ERROR_CODES.NOT_ALLOWED);
        }

        return itemData;
      }));

      const order = await tx.data_orders.create({
        data: {
          user_id: userId,
          total_price: itemsData.reduce((acc: number, item) => {
            acc += Number(item.price) * itemQuantities[item.id];
            return acc;
          }, 0),
          status: 1
        }
      });

      // Update stock
      // TODO: check for OUT_OF_STOCK status. It can be done via triggers in the database
      for (const item of data.items) {
        await tx.data_items.update({
          where: { id: item.itemId },
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        });
      }

      // insertion into data_order_items
      await tx.data_order_items.createMany({
        data: itemsData.map(item => ({
          order_id: order.id,
          item_id: item.id,
          quantity: itemQuantities[item.id],
          price: item.price
        }))
      });

      // TODO: maintain entry in data_order_history
  })
}
}

export const orders = new Orders();