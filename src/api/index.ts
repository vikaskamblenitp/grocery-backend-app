import { Router } from "express";
import v1Routes  from "./v1/index";
import { routeNotFound } from "#middlewares/route.middleware.js";

const router = Router();

router.use("/v1", v1Routes);
router.all("*", routeNotFound);

export default router;