import { Router } from "express";
import { controller as api } from "./controller";
import { methodNotAllowed } from "#middlewares/route.middleware";

const router = Router();

router.route("/grocery-items")
  .get(api.getAllGroceryItems)
  .post(api.addGroceryItem)
  .all(methodNotAllowed);

router.route("/grocery-items/:ID")
  .get(api.getGroceryItemById)
  .patch(api.updateGroceryItem)
  .all(methodNotAllowed);

export default router;