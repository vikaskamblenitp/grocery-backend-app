import { Router } from "express";
import { controller as api } from "./controller";
import { schema } from "./schema";
import { validateUser, validateRole, validateTypedSchema, methodNotAllowed } from "#middlewares/index";
import { ROLES } from "#constants";

const router = Router();

router.route("/orders")
  .post(validateUser, validateRole(ROLES.USER), validateTypedSchema(schema.createOrder) as (req, res, next) => void, api.createOrder)
  .all(methodNotAllowed);

export default router;