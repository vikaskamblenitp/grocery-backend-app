import { Request, Response } from "express";
import { groceryService } from "./groceryService";
import { catchAsync } from "#utils/catchAsync";

export const controller = {
  getAllGroceryItems: catchAsync(async (req: Request, res: Response) => {
    const response = await groceryService.getAllGroceryItems();
    res.jsend.success(response, "Grocery items fetched successfully");
  }),

  getGroceryItemById: catchAsync(async (req: Request, res: Response) => {
    const response = await groceryService.getGroceryItemById(req.params.ID);
    res.jsend.success(response, "Grocery item fetched successfully");
  }),

  addGroceryItem: catchAsync(async (req: Request, res: Response) => {
    await groceryService.addGroceryItem(req.body);
    res.jsend.success(null, "Grocery item added successfully");
  }),

  updateGroceryItem: catchAsync(async (req: Request, res: Response) => {
    const response = await groceryService.updateGroceryItem(req.params.ID, req.body);
    res.jsend.success(response, "Grocery item updated successfully");
  }),

  adjustStock: catchAsync(async (req: Request, res: Response) => {
    const response = await groceryService.adjustStock(req.params.ID, req.body);
    res.jsend.success(response, "Grocery item stock increased successfully");
  })
}