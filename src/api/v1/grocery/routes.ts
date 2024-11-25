import { Router } from "express";
import { controller as api } from "./controller";
import { methodNotAllowed } from "#middlewares/route.middleware";
import { validateTypedSchema } from "#middlewares/typedValidation.middleware";
import { schema } from "./schema";

const router = Router();

router.route("/grocery-items")
  .get(validateTypedSchema(schema.getAllGroceryItems) as (req, res, next) => void, api.getAllGroceryItems)
  .post(validateTypedSchema(schema.addGroceryItemSchema) as (req, res, next) => void, api.addGroceryItem)
  .all(methodNotAllowed);

router.route("/grocery-items/:itemID")
  .get(validateTypedSchema(schema.getGroceryItemById) as (req, res, next) => void, api.getGroceryItemById)
  .patch(validateTypedSchema(schema.updateGroceryItem) as (req, res, next) => void, api.updateGroceryItem)
  .delete(validateTypedSchema(schema.deleteGroceryItem) as (req, res, next) => void, api.deleteGroceryItem)
  .all(methodNotAllowed);

router.route("/grocery-items/:itemID/manage-stock")
  .patch(validateTypedSchema(schema.adjustStock) as (req, res, next) => void, api.adjustStock)
  .all(methodNotAllowed);

export default router;