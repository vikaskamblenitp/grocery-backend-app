import { Request, Response } from "express";
import { groceryService } from "./groceryService";

export const controller = {
  getAllGroceryItems: async (req: Request, res: Response) => {
    const response = await groceryService.getAllGroceryItems();
    res.jsend.success(response, "Grocery items fetched successfully");
  },

  getGroceryItemById: async (req: Request, res: Response) => {
    const response = await groceryService.getGroceryItemById(req.params.ID);
    res.jsend.success(response, "Grocery item fetched successfully");
  },

  addGroceryItem: async (req: Request, res: Response) => {
    await groceryService.addGroceryItem(req.body);
    res.jsend.success(null, "Grocery item added successfully");
  },

  updateGroceryItem: async (req: Request, res: Response) => {
    const response = await groceryService.updateGroceryItem(req.params.ID, req.body);
    res.jsend.success(response, "Grocery item updated successfully");
  }
}