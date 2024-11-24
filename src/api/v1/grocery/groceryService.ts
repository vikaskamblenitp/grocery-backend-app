import { data_items as GroceryItem } from "@prisma/client";
import { GroceryRepository } from "./groceryRepository";
import { v4 as uuidv4 } from 'uuid';

class GroceryService {
  private repository: GroceryRepository;

  constructor() {
    this.repository = new GroceryRepository();
  }

  async addGroceryItem(data: Omit<GroceryItem, "created_at" | "updated_at" | "id" | "status">) {
    const itemData = { ...data, id: uuidv4(), status: "ACTIVE" } as GroceryItem;
    await this.repository.create(itemData);
  }

  async getAllGroceryItems() {
    const response = await this.repository.findAll();

    return { data: response };
  }

  async getGroceryItemById(id: string) {
    const response = await this.repository.findById(id);

    return response;
  }

  async updateGroceryItem(id: string, data: Partial<GroceryItem>) {
    await this.repository.update(id, data);
  }
}

export const groceryService = new GroceryService();