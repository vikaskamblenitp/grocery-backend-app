import { Router } from "express";
import userRoutes from "./users/routes.js";
import groceryRoutes from "./grocery/routes.js";
import orderRoutes from "./orders/routes.js";

const router = Router();

router.use(userRoutes);
router.use(groceryRoutes);
router.use(orderRoutes);
router.use("/", (req, res) => {
  res.json({ info: "you are visiting the api/v1 endpoint" });
});


export default router;