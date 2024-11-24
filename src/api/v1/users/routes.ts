import { Router } from "express";
import { controller as api } from "./controller";
import { methodNotAllowed } from "#middlewares/route.middleware";
const router = Router();

router.route("/users/login").post(api.login).all(methodNotAllowed);

router.route("/users/create").post(api.createUser).all(methodNotAllowed);

export default router;