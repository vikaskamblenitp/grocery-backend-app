import { Router } from "express";
import { controller as api } from "./controller";
import { methodNotAllowed } from "#middlewares/route.middleware";
import { validateTypedSchema } from "#middlewares/typedValidation.middleware";
import { schema } from "./schema";

const router = Router();

router.route("/orders")
  .post(validateTypedSchema(schema.createOrder) as (req, res, next) => void, api.createOrder)
  .all(methodNotAllowed);

export default router;