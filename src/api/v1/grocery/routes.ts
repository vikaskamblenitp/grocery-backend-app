import { Router } from "express";
import { controller as api } from "./controller";
import { methodNotAllowed } from "#middlewares/route.middleware";
import { validateTypedSchema } from "#middlewares/typedValidation.middleware";
import { schema } from "./schema";
import { validateUser } from "#middlewares/authentication.middleware";
import { validateRole } from "#middlewares/role.middleware";
import { ROLES } from "#constants";

const router = Router();

router.route("/grocery-items")
  .get(validateUser, validateTypedSchema(schema.getAllGroceryItems) as (req, res, next) => void, api.getAllGroceryItems)
  .post(validateUser, validateRole(ROLES.ADMIN), validateTypedSchema(schema.addGroceryItemSchema) as (req, res, next) => void, api.addGroceryItem)
  .all(methodNotAllowed);

router.route("/grocery-items/:itemID")
  .get(validateUser, validateTypedSchema(schema.getGroceryItemById) as (req, res, next) => void, api.getGroceryItemById)
  .patch(validateUser, validateRole(ROLES.ADMIN), validateTypedSchema(schema.updateGroceryItem) as (req, res, next) => void, api.updateGroceryItem)
  .delete(validateUser, validateRole(ROLES.ADMIN), validateTypedSchema(schema.deleteGroceryItem) as (req, res, next) => void, api.deleteGroceryItem)
  .all(methodNotAllowed);

router.route("/grocery-items/:itemID/manage-stock")
  .patch(validateUser, validateRole(ROLES.ADMIN), validateTypedSchema(schema.adjustStock) as (req, res, next) => void, api.adjustStock)
  .all(methodNotAllowed);

export default router;