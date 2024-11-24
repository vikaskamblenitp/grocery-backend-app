import { Router } from "express";
import userRoutes from "./users/routes.js";

const router = Router();

router.use(userRoutes);
router.use("/", (req, res) => {
  res.json({ info: "you are visiting the api/v1 endpoint" });
});


export default router;