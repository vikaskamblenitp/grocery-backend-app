import { catchAsync } from "#utils/catchAsync";
import { orders as orderService } from "./orders";

export const controller = {
  createOrder: catchAsync(async (req, res) => {
    const response = await orderService.create("5ebd510d-e95a-4096-89e5-cbb6c0acb3f9", req.body);
    res.jsend.success(response, "Order created successfully");
  })
}