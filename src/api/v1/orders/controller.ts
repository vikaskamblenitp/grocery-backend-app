import { catchAsync } from "#utils/catchAsync";
import { orders as orderService } from "./orders";

export const controller = {
  createOrder: catchAsync(async (req, res) => {
    const response = await orderService.create(res.locals.user.user_id, req.body);
    res.jsend.success(response, "Order created successfully");
  })
}