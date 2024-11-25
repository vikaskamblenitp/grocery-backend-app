import { data_items as GroceryItem, Prisma } from "@prisma/client";
import { GroceryRepository } from "./groceryRepository";
import { v4 as uuidv4 } from 'uuid';
import { GroceryItemApiError } from "./error";
import { StatusCodes } from "http-status-codes";
import { ERROR_CODES } from "#constants";

class GroceryService {
  private repository: GroceryRepository;

  constructor() {
    this.repository = new GroceryRepository();
  }

  async addGroceryItem(data: Omit<GroceryItem, "created_at" | "updated_at" | "id" | "status">) {
    const itemData = { ...data, id: uuidv4(), status: "ACTIVE" } as GroceryItem;
    await this.repository.create(itemData);
  }

  async getAllGroceryItems(query) {
    const {
      name,
      minPrice,
      maxPrice,
      status,
      page = '1',
      limit = '10',
      sortField = 'created_at',
      sortOrder = 'asc',
    } = query;

    const filters: Prisma.Enumerable<Prisma.data_itemsWhereInput> = [];

    // Add filters based on query params
    if (name) {
      filters.push({ name: { contains: name, mode: 'insensitive' } });
    }
    if (minPrice) {
      filters.push({ price: { gte: parseFloat(minPrice) } });
    }
    if (maxPrice) {
      filters.push({ price: { lte: parseFloat(maxPrice) } });
    }

    if (status) {
      filters.push({ status });
    }

    const response = await this.repository.findAll({
      filters,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
      sort: {
        field: sortField as keyof Prisma.data_itemsOrderByWithRelationInput,
        order: sortOrder as 'asc' | 'desc',
      },
    });

    return { data: response };
  }

  async getGroceryItemById(id: string) {
    const response = await this.repository.findById(id);

    return response;
  }

  async updateGroceryItem(id: string, data: Partial<GroceryItem>) {
    await this.repository.update(id, data);
  }

  async adjustStock(id: string, body: { quantity: number, action: "increase" | "decrease" }) {
    const { quantity, action } = body;
    const existingQuantity = await this.repository.getStock(id);
    if (action === "increase") {
      await this.repository.updateStock(id, existingQuantity + quantity);
    } else if (action === "decrease") {
      if ((existingQuantity - quantity) < 0) throw new GroceryItemApiError(`Insufficient stock for item with ID ${id}`, StatusCodes.NOT_FOUND, ERROR_CODES.NOT_FOUND);
      await this.repository.updateStock(id, existingQuantity - quantity);
    }
  }
}

export const groceryService = new GroceryService();