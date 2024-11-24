import { prisma } from "#helpers/prismaClient";
import { data_items as GroceryItem } from "@prisma/client";


export class GroceryRepository {
  findAll() {
    return prisma.data_items.findMany();
  }

  async findById(id: string) {
    const item = await prisma.data_items.findUnique({ where: { id } });

    if (!item) throw new Error(`Item with ID ${id} not found`);

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
    return prisma.data_items.update({
      where: { id },
      data: { quantity },
    });
  }

  async getStock(id: string) {
    const item = await prisma.data_items.findUnique({ where: { id } });
    if (!item) throw new Error(`Item with ID ${id} not found`);
    return item.quantity;
  }

  async adjustStock(id: string, adjustment: number) {
    const item = await this.findById(id);
    const newQuantity = item.quantity + adjustment;
    if (newQuantity < 0) throw new Error(`Insufficient stock for item with ID ${id}`);
    return this.updateStock(id, newQuantity);
  }
}
