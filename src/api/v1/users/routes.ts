import { Router } from "express";
import { controller as api } from "./controller";
import { methodNotAllowed } from "#middlewares/route.middleware";
import { validateTypedSchema } from "#middlewares/typedValidation.middleware";
import { schema } from "./schema";
const router = Router();

router.route("/users/login").post(validateTypedSchema(schema.login) as (req, res, next) => void, api.login).all(methodNotAllowed);

router.route("/users/create").post(validateTypedSchema(schema.createUser) as (req, res, next) => void, api.createUser).all(methodNotAllowed);

export default router;