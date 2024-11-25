import { Request, Response } from "express";
import { groceryService } from "./groceryService";
import { catchAsync } from "#utils/catchAsync";

export const controller = {
  getAllGroceryItems: catchAsync(async (req: Request, res: Response) => {
    const response = await groceryService.getAllGroceryItems(req.query);
    res.jsend.success(response, "Grocery items fetched successfully");
  }),

  getGroceryItemById: catchAsync(async (req: Request, res: Response) => {
    const response = await groceryService.getGroceryItemById(req.params.itemID);
    res.jsend.success(response, "Grocery item fetched successfully");
  }),

  addGroceryItem: catchAsync(async (req: Request, res: Response) => {
    await groceryService.addGroceryItem(req.body);
    res.jsend.success(null, "Grocery item added successfully");
  }),

  updateGroceryItem: catchAsync(async (req: Request, res: Response) => {
    const response = await groceryService.updateGroceryItem(req.params.itemID, req.body);
    res.jsend.success(response, "Grocery item updated successfully");
  }),

  adjustStock: catchAsync(async (req: Request, res: Response) => {
    const response = await groceryService.adjustStock(req.params.itemID, req.body);
    res.jsend.success(response, "Grocery item stock increased successfully");
  })
}