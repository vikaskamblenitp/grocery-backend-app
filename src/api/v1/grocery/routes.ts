import { Router } from "express";
import { controller as api } from "./controller";
import { methodNotAllowed } from "#middlewares/route.middleware";
import { validateTypedSchema } from "#middlewares/typedValidation.middleware";
import { schema } from "./schema";

const router = Router();

router.route("/grocery-items")
  .get((req, res, next) => { validateTypedSchema(schema.groceryQuerySchema)(req, res, next); }, api.getAllGroceryItems)
  .post(api.addGroceryItem)
  .all(methodNotAllowed);

router.route("/grocery-items/:itemID")
  .get(api.getGroceryItemById)
  .patch(api.updateGroceryItem)
  .all(methodNotAllowed);

router.route("/grocery-items/:itemID/stock").patch(api.adjustStock).all(methodNotAllowed);

export default router;