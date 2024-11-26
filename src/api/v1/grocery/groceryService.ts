import { data_items as GroceryItem, Prisma } from "@prisma/client";
import { GroceryRepository } from "./groceryRepository";
import { GroceryItemApiError } from "./error";
import { StatusCodes } from "http-status-codes";
import { ERROR_CODES, GROCERY_ITEM_STATUS, ROLES } from "#constants";

class GroceryService {
  private repository: GroceryRepository;

  constructor() {
    this.repository = new GroceryRepository();
  }

  /**
   * @description add grocery item with default status as ACTIVE
   * @param {GroceryItem} data: grocery item payload 
   */
  async addGroceryItem(data: Omit<GroceryItem, "created_at" | "updated_at" | "id" | "status">) {
    const itemData = { status: GROCERY_ITEM_STATUS.ACTIVE, ...data } as GroceryItem;
    await this.repository.create(itemData);
  }

  /**
   * @description fetch grocery items with filters support 
   * @param {Object} query : Query options
   * @param {Object} [user] : token data passed via validateUser middleware
   * @returns 
   */
  async getAllGroceryItems(query, user): Promise<{ data: GroceryItem[] }> {
    // Only show active items to users
    if (user && user.role.code === ROLES.USER) {
      query.status = GROCERY_ITEM_STATUS.ACTIVE;
    }

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

  /**
   * @description get grocery item details bu groceryItemID
   * @param {string} id : id of the grocery item
   * @returns {object} response: item details
   */
  async getGroceryItemById(id: string) {
    const response = await this.repository.findById(id);

    return response;
  }

  /**
   * @description updating the grocery item
   * @param {string} id : id of the grocery item
   * @param {Partial<GroceryItem>} data : Partial of GroceryItem
   */
  async updateGroceryItem(id: string, data: Partial<GroceryItem>) {
    await this.repository.update(id, data);
  }

  /**
   * @description inventory management
   * @param {string} id: grocery item id
   * @param body 
   */
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

  /**
   * @description This function soft deletes the item by updating status to DELETED
   * @param {string} id: id of the grocery item 
   */
  async deleteGroceryItem(id: string) {
    // Check if item exists
    await this.getGroceryItemById(id);

    // Soft delete item and not completely delete it
    // await this.repository.delete(id);
    await this.repository.updateStatus(id, GROCERY_ITEM_STATUS.DELETED as GroceryItem["status"]);
  }
}

export const groceryService = new GroceryService();