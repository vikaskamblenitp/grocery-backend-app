import { catchAsync } from "#utils/catchAsync";
import { Request, Response } from "express";
import { users } from "./users";

export const controller = {
  login: catchAsync(async (req: Request, res: Response) => {
    const response = await users.login(req.body);
    res.jsend.success(response);
  }),

  createUser: catchAsync(async (req: Request, res: Response) => {
    const response = await users.createUser(req.body);
    res.jsend.success(response.data, response.message);
  }),
}