import { Router } from "express";
import { controller as api } from "./controller.js";
import { methodNotAllowed } from "#middlewares/route.middleware.js";

const router = Router();

router.route("/sse").post(api.setupSSE).all(methodNotAllowed);

export default router;